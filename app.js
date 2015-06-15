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
(function (requirejs) {
    'use strict';
    requirejs.config({
        paths: {
            'lodash': 'https://lodash.com/_js/lodash.min',
            'jquery': 'https://code.jquery.com/jquery-2.1.1.min',
            'highcharts': 'https://code.highcharts.com/highcharts'
        },
        shim: {
            'lodash': {
                exports: '_'
            },
            'jquery': {
                exports: 'jQuery'
            },
            'highcharts': {
                deps: ['jquery'],
                exports: 'Highcharts'
            }
        }
    });
    requirejs(['jquery', 'tasks/Task1', 'tasks/Task2', 'tasks/Task3', 'tasks/Task4'], function ($, Task1, Task2, Task3, Task4) {
        Task1.start(Output.tracein("task_1"));
        Task2.start(Output.tracein("task_2"));
        Task3.start(Output.tracein("task_3"));
        Task4.start(Output.tracein("task_4"));
    });
})(requirejs);
