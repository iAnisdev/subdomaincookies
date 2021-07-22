"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

console.log('updated script is running');
var cookies = {
    set: function set(name, value, days) {
        var date, expires;

        if (days) {
            date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }

        try {
            document.cookie = name + "=" + value + expires + "; path=/";
        } catch (e) {
            console.log("cannot set cookie for key " + name + " with value " + value + " due to error ");
            console.error(e);
        } // var domain, domainParts, date, expires, host;
        // if (days) {
        //     date = new Date();
        //     date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        //     expires = "; expires=" + date.toGMTString();
        // }
        // else {
        //     expires = "";
        // }
        // host = location.host;
        // if (host.split('.').length === 1) {
        //     document.cookie = name + "=" + value + expires + "; path=/";
        // }
        // else {
        //     domainParts = host.split('.');
        //     domainParts.shift();
        //     domain = '.' + domainParts.join('.');
        //     document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;
        //     if (subDomainCookie.get(name) == null || subDomainCookie.get(name) != value) {
        //         domain = '.' + host;
        //         document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;
        //     }
        // }

    },
    get: function get(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');

        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];

            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }

            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }

        return null; // var nameEQ = name + "=";
        // var ca = document.cookie.split(';');
        // for (var i = 0; i < ca.length; i++) {
        //     var c = ca[i];
        //     while (c.charAt(0) == ' ') {
        //         c = c.substring(1, c.length);
        //     }
        //     if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        // }
        // return null;
    },
    erase: function erase(name) {
        cookies.set(name, '', -1);
    }
};

function getParams() {
    var result = {};
    var tmp = [];
    location.search.substr(1).split("&").forEach(function (item) {
        tmp = item.split("=");
        result[tmp[0]] = decodeURIComponent(tmp[1]);
    });
    return result;
}

var urlParams = getParams();

for (var property in urlParams) {
    cookies.set(property.trim(), urlParams[property]);
}

document.querySelectorAll("[href]").forEach(function (link) {
    var current = link.href;
    console.log(current , current.startsWith('https://secure.insurely.ca/'))
    if (current.startsWith('https://secure.insurely.ca/')) {
        console.log('update params');
        var currentCookies = document.cookie.split(";").reduce(function (ac, cv, i) {
            return Object.assign(ac, _defineProperty({}, cv.split('=')[0], cv.split('=')[1]));
        }, {});
        var target = new URL(current);

        for (var key in currentCookies) {
            if (key.trim().startsWith('utm') === true) {
                target.searchParams.set(key, currentCookies[key]);
            }
        }

        link.href = target.href;
    }
});
