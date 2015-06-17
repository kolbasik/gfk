/// <reference path="../core.d.ts" />

import GFK = require("./../core/GFK");

var Human = function () {};
Human.prototype.whoami = function() {
    return 'Human';
};

var Man = GFK.inherits(Human);
Man.prototype.vote = function() {
    return 'yes';
};

export function start(trace: (text: string) => void) {
    var person = new Man();

    trace("Human?: " + (person instanceof Human));
    trace("Man?: " + (person instanceof Man));
    trace("Who am I?: " + person.whoami());
    trace("vote?: " + person.vote());
}