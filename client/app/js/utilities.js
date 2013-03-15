(function() {

'use strict';

PJS.Utilities.toList = function(obj) {
  var list = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      list.push(obj[key]);
    }
  }
  return list;
};

// from http://stackoverflow.com/questions/2970525/javascript-regex-camel-case-sentence-case
PJS.Utilities.toCamelCase = function(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
};

})();