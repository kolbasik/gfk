/// <reference path="../../typings/tsd.d.ts" />
import chai = require('chai');
import Task1 = require('./Task1');

describe('Task1: ', function () {
    var expect = chai.expect;

    describe('execute', function () {

        it('should exist', function () {
            expect(Task1.execute).to.be.ok;
        });

        it('should return the array of strings', function () {
            var expected = ['Bizz','Appz','Bizz','Bizz','Appz','Bizz','BizzAppz'];
            var actual = Task1.execute(1, 15);

            expect(actual).eql(expected);
        });
    });

});
