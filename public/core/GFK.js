/// <reference path="../../typings/tsd.d.ts" />
if (!Object.hasOwnProperty('create')) {
    Object.create = function (proto) {
        function F() {
        }
        F.prototype = proto;
        return new F();
    };
}
function inherits(Parent) {
    var Child = function () {
    };
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
    return Child;
}
exports.inherits = inherits;
function range(start, count) {
    var array = [];
    for (var i = start, il = start + count; i < il; ++i) {
        array.push(i);
    }
    return array;
}
exports.range = range;
