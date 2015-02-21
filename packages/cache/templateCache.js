'use strict';

angular.module('mycs.cache').
run(['$templateCache', function($templateCache) {
  $templateCache.put('analizer/views/perf.comparison.html',
    '<div ng-controller="AnalizerController" ng-init="loadData([\'vk\', \'facebook\'])">\n' +
    '	\n' +
    '	<mycs-perf-comparison-table data="performanceData"></mycs-perf-comparison-table>\n' +
    '\n' +
    '</div>'
  );
  $templateCache.put('analizer/directives/perfComparisonTable/tpls/perfComparisonTable.html',
    '<div class="table-layout">\n' +
    ' \n' +
    '    <table>\n' +
    '    	<thead>\n' +
    '\n' +
    '    		<th>\n' +
    '                <span>Variable</span>\n' +
    '    		</th>\n' +
    '            <th>\n' +
    '                <span>Value(\n' +
    '                    <a href="javascript:void(0)" ng-class="{active: ordering == \'min\'}" ng-click="changeOrdering(\'min\')">min</a>\n' +
    '                    &nbsp;/&nbsp;\n' +
    '                    <a href="javascript:void(0)" ng-class="{active: ordering == \'max\'}" ng-click="changeOrdering(\'max\')">max</a>\n' +
    '                )</span>\n' +
    '            </th>\n' +
    '            <th>\n' +
    '                <span>Average</span>\n' +
    '            </th>\n' +
    '            <th>\n' +
    '                <span>Website</span>\n' +
    '            </th>\n' +
    '\n' +
    '    	</thead>\n' +
    '        <tbody>\n' +
    '\n' +
    '            <tr ng-repeat="(metric, values) in metrics">\n' +
    '                <td>\n' +
    '                   <span>{{::metric}}</span> \n' +
    '                </td>\n' +
    '                <td>\n' +
    '                    <span>{{values[ordering][ordering]}}</span>\n' +
    '                </td>\n' +
    '                <td>\n' +
    '                    <span>{{values[ordering].average}}</span>\n' +
    '                </td>\n' +
    '                <td>\n' +
    '                    <span>{{values[ordering].site}}</span>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '\n' +
    '        </tbody>\n' +
    '    </table>\n' +
    '    \n' +
    '</div>'
  );
}]);
