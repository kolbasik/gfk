/// <reference path="../core.d.ts" />
define(["require", "exports", "../core/GFK"], function (require, exports, GFK) {
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
});
