/// <reference path="../core.d.ts" />
var HTTP = require("../core/HTTP");
function start(trace) {
    trace('making HTTP calls...');
    var requests = [
        HTTP.get("http://cdn.gfkdaphne.com/tests/async.php?a=1"),
        HTTP.get("http://cdn.gfkdaphne.com/tests/async.php?a=2")
    ];
    trace('waiting...');
    Promise.all(requests).then(function (data) {
        trace('result: ' + data.join(' '));
    });
}
exports.start = start;
