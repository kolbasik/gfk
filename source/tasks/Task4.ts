/// <reference path="../core.d.ts" />

import HTTP = require("../core/HTTP");

export function start(trace: (text: string) => void) {

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