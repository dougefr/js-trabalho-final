const regex = /^\s*(\d+|\d+\.\d+)\s*([+-\/\*])\s*(\d+|\d+\.\d+)\s*$/gm;

export default function calculo(str: string) {
  let m;
  let gruposEncontrados = 0;

  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      gruposEncontrados++;
    });
  }

  return new Promise((resolve, reject) => {
    if (gruposEncontrados === 4) {
      setTimeout(() => resolve(eval(str) as number), 5000);
    } else {
      reject("operação inválida");
    }
  });
}
