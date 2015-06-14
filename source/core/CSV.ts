/// <reference path="../../typings/tsd.d.ts" />

export function parse(data: string, delimiter: string) : any[] {
    delimiter = delimiter || ';';
    var rows = data.split('\r\n'),
        headers = rows.shift().split(delimiter);

    rows.pop(); // NOTE: removes the redundant empty string

    return rows.map(function(row){
        var object={},
            cells=row.split(delimiter);

        for(var i=0, il=headers.length; i<il; ++i) {
            object[headers[i]] = cells[i];
        }

        return object;
    });
}
