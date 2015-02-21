'use strict';

angular.module('mycs.analizer').directive('mycsPerfComparisonTable', [function() {
	/**
	* Display performance comparison table
	*/
	return {
		scope: {
			data: '=data'
		},
		restrict: 'E',
		templateUrl: 'analizer/directives/perfComparisonTable/tpls/perfComparisonTable.html',
		link: function($scope, iElm, iAttrs, controller) {

			/**
			* Run init functions when data is loaded
			* @param {object} sites data watched for outer scoper
			*/
			var init = function(data) {
				if (typeof data === 'undefined') return;
				$scope.getSiteUrls();
				$scope.humanizeData();
			};

			// array of site urls
			$scope.sites = [];

			/**
			* Get sites urls from data and save them to scope
			*/
			$scope.getSiteUrls = function() {
				angular.forEach($scope.data, function(site) {
					$scope.sites.push(site.runs[0].url);
				});
			};

			// data filter: 'min' or 'max'
			$scope.ordering = 'min';

			/**
			* Parse data so that directive can process it with minimal expressions count
			*/
			$scope.humanizeData = function() {
				var metrics = {},
					stats = {};

				// get all statistics from data
				angular.forEach($scope.data, function(site, i) {
					angular.forEach(site.stats, function(item, metric) {
						item.site = $scope.sites[i];
						if (!stats.hasOwnProperty(metric)) {
							stats[metric] = [ item ];
						} else {
							stats[metric].push(item);
						}
					});
				});

				// create metrics objects with minimal and maximal values for each stat metric
				angular.forEach(stats, function(item, metric) {
					metrics[metric] = {};
					if (item[0].max - item[1].max > 0) {
						metrics[metric].min = item[1];
						metrics[metric].max = item[0];
					} else if (item[0].max - item[1].max < 0) {
						metrics[metric].min = item[0];
						metrics[metric].max = item[1];
					} else {
						metrics[metric].min = item[0];
						metrics[metric].min.average = ' --- ';
						metrics[metric].min.site = 'both';
						metrics[metric].max = metrics[metric].min;
					}
				});

				// save it to scope
				$scope.metrics = metrics;
			};

			/**
			* Chnages ordering filter
			* @param {string} ordering New ordering. In current implementation can be 'min' or 'max'
			*/
			$scope.changeOrdering = function(ordering) {
				$scope.ordering = ordering;
			};

			// on outer data change try to init directive
            $scope.$watch('data', init);

		}
	};
}]);