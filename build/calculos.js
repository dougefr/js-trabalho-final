"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regex = /^\s*(\d+|\d+\.\d+)\s*([+-\/\*])\s*(\d+|\d+\.\d+)\s*$/gm;
function calculo(str) {
  var m;
  var gruposEncontrados = 0;
  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    // The result can be accessed through the `m`-variable.
    m.forEach(function (match, groupIndex) {
      gruposEncontrados++;
    });
  }
  return new Promise(function (resolve, reject) {
    if (gruposEncontrados === 4) {
      setTimeout(function () {
        return resolve(eval(str));
      }, 5000);
    } else {
      reject("operação inválida");
    }
  });
}
exports.default = calculo;
