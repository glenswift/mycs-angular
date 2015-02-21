'use strict';

(function() {

    var expect = chai.expect;

    describe('PerformanceData Service', function() {

    	var PerformanceData,
            $httpBackend,
            $q;

        beforeEach(function() {
            module('mycs');
            module('mycs.analizer');
        });

        beforeEach(inject(function(_$injector_, _$httpBackend_, _$q_) {
            PerformanceData = _$injector_.get('PerformanceData');
            $httpBackend = _$httpBackend_;
            $q = _$q_;
        }));

        describe('#load', function() {

            var loadResult,
                loadResultCBSpy = sinon.spy();

            beforeEach(function() {
                $httpBackend.expectGET('/data/foo.json').respond(200, {foo: 'test'});
                $httpBackend.expectGET('/data/bar.json').respond(200, {bar: 'test'});
                loadResult = PerformanceData.load(['foo', 'bar']).then(loadResultCBSpy);
                $httpBackend.flush();
            });

            it('should throw error when called without arguments', function() {
                expect(function() {
                    PerformanceData.load();
                }).to.throw(Error);
            });

            it('should throw error when called with non array argument', function() {
                expect(function() {
                    PerformanceData.load('not array');
                }).to.throw(Error);
            });

            it('should throw error when called with array with length non equal to 2', function() {
                expect(function() {
                    PerformanceData.load(['I want', 'to break', 'free']);
                }).to.throw(Error);
            });

            it('should return promise', function() {
                expect(loadResult.then).to.exist;
            });

            it('should return data from json files', function() {
                var args = loadResultCBSpy.getCall(0).args[0];
                expect(args).to.be.an('array');
                expect(args).to.have.length(2);
                expect(args[0].foo).to.exist;
                expect(args[1].bar).to.exist;
            });

        });

        

    });

}());
