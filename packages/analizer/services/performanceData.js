'use strict';

angular.module('mycs.analizer').factory('PerformanceData', ['$resource', '$q',
    function ($resource, $q) {

        var resource = $resource('/data/:file', {
            file: '@file'
        }, {
            load: {
                method: 'GET',
                isArray: false
            }
        });

        return {
            /**
            * Loads data from file system
            * @param {array} files List of files to load (without extension), must be array with length 2
            */ 
            load: function(files) {
                var promises = [],
                    error;

                if (typeof files === 'undefined') {
                    error = 'You should pass json files to load';
                } else if (!files instanceof Array) {
                    error = 'Files list should be array';
                } else if (files.length !== 2) {
                    error = 'You must pass exactly 2 files to compare';
                }

                if (error) {
                    throw new Error(error);
                }

                angular.forEach(files, function(file) {
                    promises.push(resource.load({
                        file: file + '.json'
                    }).$promise);
                });
                
                return $q.all(promises);
            }
        };

    }
]);