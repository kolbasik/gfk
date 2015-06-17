/// <reference path="../typings/tsd.d.ts" />
class Output {
    private $output: JQuery;

    constructor(container: string) {
        this.$output = $("[data-item=" + container + "] .console:first");
    }

    log(message) {
        $('<div></div>').html((message || '').toString()).appendTo(this.$output);
    }

    static tracein(container: string) : (message: string) => void {
        var output = new Output(container);
        return output.log.bind(output);
    }
}

import Task1 = require("./tasks/Task1");
import Task2 = require('./tasks/Task2');
import Task3 = require('./tasks/Task3');
import Task4 = require('./tasks/Task4');

Task1.start(Output.tracein("task_1"));
Task2.start(Output.tracein("task_2"));
Task3.start(Output.tracein("task_3"));
Task4.start(Output.tracein("task_4"));