/// <reference path="../core.d.ts" />

import GFK = require("./../core/GFK");

var mappings = {
    'Bizz': (value: number) => value % 3 == 0,
    'Appz': (value: number) => value % 5 == 0,
};

function map(i: number) : GFK.KVP<number, string> {
    var reduce = (message, key) => ((mappings[key](i) && (message += key)), message);
    var value = Object.keys(mappings).reduce(reduce, '');
    return { key: i, value: value };
}

function reduce(acc: string[], kvp: GFK.KVP<number, string>) : string[] {
    return (kvp.value && acc.push(kvp.value)), acc;
}

export function execute(start: number, count: number): string[] {
    return GFK.range(start, count).map(map).reduce(reduce, []);
}

export function start(trace: (text: string) => void) {
    execute(1, 100).forEach(trace);
}