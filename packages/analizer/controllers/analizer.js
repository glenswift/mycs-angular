'use strict';

angular.module('mycs.analizer').controller('AnalizerController', ['$scope', 'PerformanceData', function ($scope, PerformanceData) {

    /**
     * Loads sites data for given files and save it to scope
     * @param {array} files List of files to load (without extension), must be array with length 2
     */
    $scope.loadData = function(files) {
        PerformanceData.load(files).then(function(data) {
            $scope.performanceData = data;
        }, function(err) {
            console.log(err);
        });
    };

}]);