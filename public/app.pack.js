(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/// <reference path="../typings/tsd.d.ts" />
var Output = (function () {
    function Output(container) {
        this.$output = $("[data-item=" + container + "] .console:first");
    }
    Output.prototype.log = function (message) {
        $('<div></div>').html((message || '').toString()).appendTo(this.$output);
    };
    Output.tracein = function (container) {
        var output = new Output(container);
        return output.log.bind(output);
    };
    return Output;
})();
var Task1 = require("./tasks/Task1");
var Task2 = require('./tasks/Task2');
var Task3 = require('./tasks/Task3');
var Task4 = require('./tasks/Task4');
Task1.start(Output.tracein("task_1"));
Task2.start(Output.tracein("task_2"));
Task3.start(Output.tracein("task_3"));
Task4.start(Output.tracein("task_4"));

},{"./tasks/Task1":5,"./tasks/Task2":6,"./tasks/Task3":7,"./tasks/Task4":8}],2:[function(require,module,exports){
/// <reference path="../../typings/tsd.d.ts" />
function parse(data, delimiter) {
    delimiter = delimiter || ';';
    var rows = data.split('\r\n'), headers = rows.shift().split(delimiter);
    if (!rows[rows.length - 1]) {
        rows.pop();
    }
    return rows.map(function (row) {
        var object = {}, cells = row.split(delimiter);
        for (var i = 0, il = headers.length; i < il; ++i) {
            object[headers[i]] = cells[i];
        }
        return object;
    });
}
exports.parse = parse;

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
/// <reference path="../../typings/tsd.d.ts" />
function get(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(xhr.responseText);
                }
                else {
                    reject(xhr.status);
                }
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    });
}
exports.get = get;

},{}],5:[function(require,module,exports){
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

},{"./../core/GFK":3}],6:[function(require,module,exports){
/// <reference path="../core.d.ts" />
var GFK = require("./../core/GFK");
var Human = function () {
};
Human.prototype.whoami = function () {
    return 'Human';
};
var Man = GFK.inherits(Human);
Man.prototype.vote = function () {
    return 'yes';
};
function start(trace) {
    var person = new Man();
    trace("Human?: " + (person instanceof Human));
    trace("Man?: " + (person instanceof Man));
    trace("Who am I?: " + person.whoami());
    trace("vote?: " + person.vote());
}
exports.start = start;

},{"./../core/GFK":3}],7:[function(require,module,exports){
/// <reference path="../core.d.ts" />
var HTTP = require("./../core/HTTP");
var CSV = require("./../core/CSV");
function start(trace) {
    trace('data.csv loading...');
    HTTP.get("data.csv").then(function (source) {
        trace('data.csv parsing...');
        var data = CSV.parse(source, ';');
        trace('analyzing...');
        var kvps = analize(data);
        trace('visualizing...');
        highcharts('[data-item=task_3] .chart', kvps);
    });
}
exports.start = start;
function analize(data) {
    return _.map(_.groupBy(data, _.property('DATE')), function (values, key) {
        var positives = _.where(values, { 'ANSWER': 'yes' });
        return { key: key, value: Math.round(positives.length * 100 / values.length) };
    });
}
exports.analize = analize;
function highcharts(selector, data) {
    var $chart = $(selector);
    $chart.highcharts({
        title: {
            text: 'Answers'
        },
        xAxis: {
            categories: _.pluck(data, 'key')
        },
        yAxis: {
            title: {
                text: 'Percentage %'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '%'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Yes',
            data: _.pluck(data, 'value')
        }]
    });
}
exports.highcharts = highcharts;

},{"./../core/CSV":2,"./../core/HTTP":4}],8:[function(require,module,exports){
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

},{"../core/HTTP":4}]},{},[1]);
