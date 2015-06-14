/// <reference path="../../typings/tsd.d.ts" />

export interface KVP<TKey, TValue> {
    key: TKey;
    value: TValue
}

if (!Object.hasOwnProperty('create')) {
    Object.create = function (proto) {
        function F() {}
        F.prototype = proto;
        return new F();
    };
}

export function inherits(Parent) {
    var Child = function () {};
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
    return Child;
}

export function range(start: number, count: number) : number[] {
    var array: number[] = [];
    for(var i = start, il = start + count; i < il; ++i) {
        array.push(i);
    }
    return array;
}