'use strict';

(function() {

    var expect = chai.expect;

    describe('Analizer Controller', function() {

    	var PerformanceData,
            scope,
            $httpBackend,
            $q,
            $stateParams;

        beforeEach(function() {
            module('mycs');
            module('mycs.analizer');
        });

        beforeEach(inject(function(_$controller_, _$rootScope_, _$injector_, _$httpBackend_, _$q_, _$templateCache_) {
            scope = _$rootScope_.$new();
            PerformanceData = _$injector_.get('PerformanceData');
            _$controller_('AnalizerController', {$scope: scope});
            $httpBackend = _$httpBackend_;
            $q = _$q_;
        }));

        describe('#loadData', function() {

            var PerfDataSpy;

            beforeEach(function() {
                PerfDataSpy = sinon.spy(PerformanceData, 'load');
                $httpBackend.expectGET('/data/foo.json').respond(200, {foo: 'test'});
                $httpBackend.expectGET('/data/bar.json').respond(200, {bar: 'test'});
                scope.loadData(['foo', 'bar']);
                $httpBackend.flush();
            });

            it('should load data via service', function() {
                expect(PerfDataSpy.calledOnce).to.be.true;
            });

            it('should save data to scope.performanceData', function() {
                expect(scope.performanceData).to.be.an('array');
                expect(scope.performanceData[0].foo).to.exist;
                expect(scope.performanceData[0].foo).to.be.equal('test');
                expect(scope.performanceData[1].bar).to.exist;
                expect(scope.performanceData[1].bar).to.be.equal('test');
            });

        });

        

    });

}());
