/* global MyRecipeBoxes */
MyRecipeBoxes.filter('toArray', function () {
    'use strict';

    return function (obj) {
        if (!(obj instanceof Object)) {
            return obj;
        }
        return Object.keys(obj).filter(function(key){if(key.charAt(0) !== "$") {return key;}}).map(function (key) {
            return Object.defineProperty(obj[key], '$key', {value: key});
        });
    };
});