/// <reference path="../core.d.ts" />
define(["require", "exports", "../core/GFK"], function (require, exports, GFK) {
    function Bizz(value) {
        return (value % 3 == 0) ? 'Bizz' : null;
    }
    function Appz(value) {
        return (value % 5 == 0) ? 'Appz' : null;
    }
    function map(i) {
        var value = [Bizz(i), Appz(i)].join('');
        return { key: i, value: value };
    }
    function reduce(acc, kvp) {
        if (kvp.value) {
            acc.push(kvp.key + ": " + kvp.value);
        }
        return acc;
    }
    function start(trace) {
        GFK.range(1, 100).map(map).reduce(reduce, []).forEach(trace);
    }
    exports.start = start;
});
