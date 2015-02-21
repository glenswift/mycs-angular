'use strict';

(function () {

    var expect = chai.expect;

    describe('PerfComparisonTable Directive', function () {

        beforeEach(function () {
            module('mycs');
            module('mycs.cache');
            module('mycs.analizer');
            module('mycs.system');
        });

        var element,
            outerScope,
            innerScope,
            scope,
            $httpBackend,
            dataExample = [{
                runs: [{
                    url: 'http://first.site'
                }, {
                    url: 'http://first.site'
                }],
                stats: {
                    AAA: {
                        average: 20,
                        min: 10,
                        max: 40
                    },
                    BBB: {
                        average: 200,
                        min: 100,
                        max: 400
                    },
                    CCC: {
                        average: 100,
                        min: 0,
                        max: 200
                    }
                }
            }, {
                runs: [{
                    url: 'http://second.site'
                }, {
                    url: 'http://second.site'
                }],
                stats: {
                    AAA: {
                        average: 2000,
                        min: 1000,
                        max: 4000
                    },
                    BBB: {
                        average: 2,
                        min: 1,
                        max: 4
                    },
                    CCC: {
                        average: 100,
                        min: 0,
                        max: 200
                    }
                }
            }];

        beforeEach(inject(function (_$rootScope_, _$compile_) {
            outerScope = _$rootScope_.$new();
            element = '<mycs-perf-comparison-table data="performanceData"></mycs-perf-comparison-table>';
            element = _$compile_(element)(outerScope);

            outerScope.performanceData = dataExample;

            outerScope.$digest();
            innerScope = element.isolateScope();
        }));

        describe('after initialization', function () {

            describe('#getSiteUrls', function() {

                it('should save all sites to scope.sites', function() {
                    expect(innerScope.sites).to.deep.equal(['http://first.site', 'http://second.site']);
                });

            });

            describe('default ordering', function() {

                it('should be setted', function() {
                    expect(innerScope.ordering).to.exist;
                    expect(innerScope.ordering).to.be.a('string');
                });

            });

            describe('#changeOrdering', function() {

                var newOrdering = 'max';

                beforeEach(function() {
                    innerScope.changeOrdering(newOrdering);
                });

                it('should change default ordering to given value', function() {
                    expect(innerScope.ordering).to.be.equal(newOrdering);
                });

            });

            describe('#humanizeData', function() {

                beforeEach(function() {
                    innerScope.humanizeData();
                });

                it('should set humanized data to scope.metrics', function() {
                    expect(innerScope.metrics).to.exist;
                    expect(innerScope.metrics).to.be.an('object');
                });

                describe('scope.metrics properties', function() {

                    var metrics = Object.keys(dataExample[0].stats);

                    it('should be representation of all metrics', function() {
                        expect(Object.keys(innerScope.metrics)).to.be.deep.equal(metrics);
                    });

                    it('should set children objects with keys min and max', function() {
                        angular.forEach(innerScope.metrics, function(item) {
                            expect(item).to.have.property('min');
                            expect(item).to.have.property('max');
                        });
                    });

                    it('min object should be representation of site with smallest min metric', function() {
                        expect(innerScope.metrics.AAA.min.min).to.be.equal(10);
                        expect(innerScope.metrics.BBB.min.min).to.be.equal(1);
                        expect(innerScope.metrics.AAA.min.site).to.be.equal('http://first.site');
                        expect(innerScope.metrics.BBB.min.site).to.be.equal('http://second.site');
                    });

                    it('max object should be representation of site with greatest max metric', function() {
                        expect(innerScope.metrics.AAA.max.max).to.be.equal(4000);
                        expect(innerScope.metrics.BBB.max.max).to.be.equal(400);
                        expect(innerScope.metrics.AAA.max.site).to.be.equal('http://second.site');
                        expect(innerScope.metrics.BBB.max.site).to.be.equal('http://first.site');
                    });

                    it('should set min/max object equal to each other, site to both, average '
                        + 'to dashes in case min/max values are equal', function() {
                        expect(innerScope.metrics.CCC.min.min).to.be.equal(0);
                        expect(innerScope.metrics.CCC.min.max).to.be.equal(200);
                        expect(innerScope.metrics.CCC.max.min).to.be.equal(0);
                        expect(innerScope.metrics.CCC.max.max).to.be.equal(200);
                        expect(innerScope.metrics.CCC.min.site).to.be.equal('both');
                        expect(innerScope.metrics.CCC.max.site).to.be.equal('both');
                        expect(innerScope.metrics.CCC.min.average).to.be.equal(' --- ');
                        expect(innerScope.metrics.CCC.max.average).to.be.equal(' --- ');
                    });

                });

            });

        });

    });

}());