/// <reference path="../../typings/tsd.d.ts" />
import chai = require('chai');
import HTTP = require('./HTTP');

declare var Promise: any;

describe('HTTP: ', function () {
    var expect = chai.expect;

    describe('get', function () {
        var source = 'http://google.com';

        it('should exist', function () {
            expect(HTTP.get).to.be.ok;
        });

        it('should return the array of objects', function (done) {
            if (typeof Promise === 'undefined') {
                done();
            }
            HTTP.get(source).then(function(){
               done();
            });
        });
    });

});
