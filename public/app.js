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
