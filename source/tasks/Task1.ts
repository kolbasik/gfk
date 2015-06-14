/// <reference path="../core.d.ts" />

import GFK = require("../core/GFK");

function Bizz(value: number) : string {
    return (value % 3 == 0) ? 'Bizz' : null;
}

function Appz(value: number) : string {
    return (value % 5 == 0) ? 'Appz' : null;
}

function map(i: number) : GFK.KVP<number, string> {
    var value = [Bizz(i), Appz(i)].join('');
    return { key: i, value: value };
}

function reduce(acc: string[], kvp: GFK.KVP<number, string>) : string[] {
    if (kvp.value) {
        acc.push(kvp.key + ": " + kvp.value);
    }
    return acc;
}

export function start(trace: (text: string) => void) {
    GFK.range(1, 100).map(map).reduce(reduce, []).forEach(trace);
}