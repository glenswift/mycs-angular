'use strict';

angular.module('mycs.analizer').config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider
            .state('homepage', {
                url: '/',
                templateUrl: 'analizer/views/perf.comparison.html'
            });
    }
]);