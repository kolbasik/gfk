/// <reference path="../core.d.ts" />
define(["require", "exports", "lodash", "jquery", "highcharts", "../core/HTTP", "../core/CSV"], function (require, exports, _, $, highcharts, HTTP, CSV) {
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
});
