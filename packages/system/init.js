'use strict';

/*jslint browser: true*/

angular.element(document).ready(function () {
    // Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    // Bootstrap awesomeness
    angular.bootstrap(document, ['mycs']);

});

window.modules = [
    {
        module: 'mycs.system',
        name: 'system'
    },
    {
        module: 'mycs.analizer',
        name: 'analizer'
    },
    {
        module: 'mycs.cache',
        name: 'cache'
    }
];

// Dynamically add angular modules declared by packages
var packageModules = [];
for (var index in window.modules) {
    angular.module(window.modules[index].module, window.modules[index].angularDependencies || []);
    packageModules.push(window.modules[index].module);
}

// Default modules
var modules = ['ngCookies', 'ngResource', 'ui.router'];
modules = modules.concat(packageModules);

// Combined modules
angular.module('mycs', modules);