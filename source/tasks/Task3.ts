/// <reference path="../core.d.ts" />

import _ = require("lodash");
import $ = require("jquery");
import highcharts = require("highcharts");
import GFK = require("../core/GFK");
import HTTP = require("../core/HTTP");
import CSV = require("../core/CSV");

export function start(trace: (text: string) => void) {
    trace('data.csv loading...');
    HTTP.get("data.csv").then(function (source: string) {

        trace('data.csv parsing...');
        var data = CSV.parse(source, ';');

        trace('analyzing...');
        var kvps = analize(data);

        trace('visualizing...');
        highcharts('[data-item=task_3] .chart', kvps);
    });
}

export function analize(data: any[]) : GFK.KVP<string, number>[] {
    return _.map(_.groupBy(data, _.property('DATE')), function(values, key) {
        var positives = _.where(values, { 'ANSWER': 'yes' });
        return { key: key, value: Math.round(positives.length * 100 / values.length) };
    });
}

export function highcharts(selector: string, data: GFK.KVP<string, number>[]) : void {
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