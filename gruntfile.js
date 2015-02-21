'use strict';

var paths = {
    js: [
        'packages/**/init.js',
        'packages/**/app.js',
        'packages/cache/templateCache.js',
        'packages/**/config/*.js',
        'packages/**/routes/*.js',
        'packages/**/controllers/*.js',
        'packages/**/services/*.js',
        'packages/**/filters/*.js',
        'packages/**/directives/**/*.js'
    ],
    libjs: [
        'components/angular/angular.min.js',
        'components/angular-cookies/angular-cookies.min.js',
        'components/angular-resource/angular-resource.min.js',
        'components/angular-ui-router/release/angular-ui-router.min.js'
    ],
    less: [
        'packages/**/assets/less/*.less',
        'packages/**/directives/**/tpls/less/*.less'
    ]
};

var pipeline = {

    // Application views to watch for
    html: [
        'packages/**/views/*.html',
        'packages/**/directives/**/tpls/*.html'
    ],

    // Application javascripts to build
    appjs: {
        path: {
            'build/js/app/app.min.js': paths.js
        },
        map: 'build/js/app/app.min.js.map'
    },

    // Third-party javascripts to build
    libjs: {
        path: {
            'build/js/lib/lib.min.js': paths.libjs
        }
    },

    // Application CSS to build
    less: {
        'build/css/app/app.min.css': paths.less
    }
};

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            js: {
                files: paths.js,
                tasks: ['jshint', 'uglify:development'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: pipeline.html,
                tasks: ['angularTemplateCache:development'],
                options: {
                    livereload: true,
                    interval: 100
                }
            },
            less: {
                files: paths.less,
                tasks: ['less:development'],
                options: {
                    livereload: true
                }
            }
        },
        uglify: {
            development: {
                options: {
                    compress: false,
                    preserveComments: false,
                    sourceMap: true,
                    sourceMapName: pipeline.appjs.map
                },
                files: pipeline.appjs.path
            },
            production: {
                options: {
                    compress: true,
                    preserveComments: 'some',
                    sourceMap: false
                },
                files: pipeline.appjs.path
            },
            lib: {
                options: {
                    compress: false,
                    preserveComments: 'some'
                },
                files: pipeline.libjs.path
            }
        },
        less: {
            development: {
                options: {
                    compress: false,
                    cleancss: false
                },
                files: pipeline.less
            },
            production: {
                options: {
                    compress: true,
                    cleancss: true
                },
                files: pipeline.less
            }
        },
        jshint: {
            files: {
                src: paths.js
            },
            options: {
                jshintrc: true
            }

        },
        angularTemplateCache: {
            development: {
                src: pipeline.html,
                dest: 'packages/cache/templateCache.js',
                cwd: '.',
                options: {
                    module: 'mycs.cache',
                    processName: function (name, content) {
                        return name.replace(/packages\//g, '');
                    }
                }
            },
            production: {
                src: pipeline.html,
                dest: 'packages/cache/templateCache.js',
                cwd: '.',
                options: {
                    module: 'mycs.cache',
                    htmlmin: {
                        removeComments: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: true
                    },
                    processName: function (name, content) {
                        return name.replace(/packages\//g, '');
                    }
                }
            }
        },
        concurrent: {
            tasks: ['watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
    });

    grunt.registerTask('default', [
        'jshint',
        'uglify:development',
        'less:development',
        'angularTemplateCache:development',
        'concurrent'
    ]);

    grunt.registerTask('build', [
        'jshint',
        'uglify:development',
        'less:development',
        'angularTemplateCache:development',
    ]);

    grunt.registerTask('release', [
        'jshint',
        'uglify:production',
        'less:production',
        'angularTemplateCache:production'
    ]);

    grunt.registerTask('buildlib', ['uglify:lib']);

    grunt.registerTask('test', ['jshint', 'karma']);

};
