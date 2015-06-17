/// <reference path="../core.d.ts" />
var GFK = require("./../core/GFK");
var mappings = {
    'Bizz': function (value) { return value % 3 == 0; },
    'Appz': function (value) { return value % 5 == 0; },
};
function map(i) {
    var reduce = function (message, key) { return ((mappings[key](i) && (message += key)), message); };
    var value = Object.keys(mappings).reduce(reduce, '');
    return { key: i, value: value };
}
function reduce(acc, kvp) {
    return (kvp.value && acc.push(kvp.value)), acc;
}
function execute(start, count) {
    return GFK.range(start, count).map(map).reduce(reduce, []);
}
exports.execute = execute;
function start(trace) {
    execute(1, 100).forEach(trace);
}
exports.start = start;
