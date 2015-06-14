/// <reference path="../../typings/tsd.d.ts" />

export function get(url) {
    return new Promise<string>(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(xhr.responseText);
                }
                else {
                    reject(xhr.status);
                }
            }
        };

        xhr.open("GET", url, true);
        xhr.send();
    });
}