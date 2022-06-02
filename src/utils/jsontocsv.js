const { Parser } = require("json2csv");
const fs = require("fs");

var json2csv;
const ozzHeader = [
  "Number",
  "DateTime",
  "Main1",
  "Main2",
  "Main3",
  "Main4",
  "Main5",
  "Main6",
  "Main7",
  "Supp1",
  "Supp2",
  "Supp3",
];
const sflifeHeader = [
  "Number",
  "DateTime",
  "Main1",
  "Main2",
  "Main3",
  "Main4",
  "Main5",
  "Main6",
  "Main7",
  "Supp1",
  "Supp2",
];
const powerHeader = [
  "Number",
  "DateTime",
  "Main1",
  "Main2",
  "Main3",
  "Main4",
  "Main5",
  "Main6",
  "Main7",
  "Supp1",
];
const defaultHeader = [
  "Number",
  "DateTime",
  "Main1",
  "Main2",
  "Main3",
  "Main4",
  "Main5",
  "Main6",
  "Supp1",
  "Supp2",
];

function spliceLongAr(size, array) {
  let finalArray = [];
  for (let i = 0; i < array.length; i += size) {
    finalArray.push(array.slice(i, i + size));
  }

  return finalArray;
}

function intersection(csv, arr) {
  const setA = new Set(csv);
  const setB = new Set(arr);
  let _intersection = new Set();
  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
}

function compareTwoArray(csv, myArr, size) {
  return myArr.filter((arr) => intersection(csv, arr).size >= size);
}

function verificaPastJogos(jogo, json, winCombination) {
  setJson2CsvHeader(jogo);
  let size = selecionarSize(winCombination);
  let csvJsonEntrada = converterJsonParaCsv(json);
  let csvPassado = obterArquivoCsvPassadoOuFuturo(jogo, "passado");
  var valueToSplice = jogo === "power" ? 7 : 6;
  const arr = spliceLongAr(valueToSplice, csvPassado);
  let result = compareTwoArray(csvJsonEntrada, arr, size);
  return winningCombinantionValidator(
    jogo,
    csvJsonEntrada,
    result,
    winCombination
  );
}
function verificaFuturoJogos(jogo, json, winCombination) {
  setJson2CsvHeader(jogo);
  let size = selecionarSize(winCombination);
  let csvJsonEntrada = converterJsonParaCsv(json);
  let csvFuturo = obterArquivoCsvPassadoOuFuturo(jogo, "futuro");
  var valueToSplice = jogo === "power" ? 7 : 6;
  const arr = spliceLongAr(valueToSplice, csvFuturo);
  let result = compareTwoArray(csvJsonEntrada, arr, size);
  return winningCombinantionValidator(
    jogo,
    csvJsonEntrada,
    result,
    winCombination
  );
}
function verificaPast(jogo, json) {
  setJson2CsvHeader(jogo);
  const csv = converterJsonParaCsv(json);

  const past = obterArquivoCsvPassadoOuFuturo(jogo, "passado");
  var valueToSplice = jogo === "power" ? 7 : 6;
  const arr = spliceLongAr(valueToSplice, past);

  let result = compareTwoArray(csv, arr, 4);
  return result;
}

function verificaFuture(jogo, json) {
  setJson2CsvHeader(jogo);
  const csv = converterJsonParaCsv(json);

  const future = obterArquivoCsvPassadoOuFuturo(jogo, "future");
  var valueToSplice = jogo === "power" ? 7 : 6;

  const arr = spliceLongAr(valueToSplice, future);
  let result = compareTwoArray(csv, arr, 4);
  return result;
}

function setJson2CsvHeader(jogo) {
  if (jogo === "ozz") {
    json2csv = new Parser({ fields: ozzHeader });
  } else if (jogo === "sflife") {
    json2csv = new Parser({ fields: sflifeHeader });
  } else if (jogo === "power") {
    json2csv = new Parser({ fields: powerHeader });
  } else {
    json2csv = new Parser({ fields: defaultHeader });
  }
}
function retornaBolasRepetidas(jogo, json) {
  setJson2CsvHeader(jogo);
  const csv = json2csv
    .parse(json)
    .replace(/"/g, "")
    .replace(/,/g, " ")
    .replace(/\r/g, " ")
    .replace(/\n/g, " ");

  let lines = csv.split(" ");

  let counts = {};
  let multiples = {};

  for (let i = 0, ii = lines.length; i < ii; i++) {
    let val = lines[i];

    if (!counts[val]) {
      counts[val] = 1;
    } else {
      counts[val]++;
      multiples[val] = counts[val];
    }
  }

  return multiples;
}
function converterJsonParaCsv(json) {
  return json2csv
    .parse(json)
    .replace(/"/g, "")
    .replace(/,/g, " ")
    .replace(/\r/g, " ")
    .replace(/\n/g, " ")
    .replace(/'/g, "")
    .split(" ")
    .map((x) => +x)
    .filter((x) => {
      return !Number.isNaN(x);
    })
    .filter((x) => x !== 0);
}
function obterArquivoCsvPassadoOuFuturo(jogo, isPast) {
  let nomeDoArquivo;
  if (isPast === "passado") {
    nomeDoArquivo =
      jogo === "ozz"
        ? "./src/assets/ozzpast.csv"
        : jogo === "power"
        ? "./src/assets/pbpast.csv"
        : jogo === "sflife"
        ? "./src/assets/sflpast.csv"
        : "./src/assets/past.csv";
  } else {
    nomeDoArquivo =
      jogo === "ozz"
        ? "./src/assets/ozzfuture.csv"
        : jogo === "power"
        ? "./src/assets/pbfuture.csv"
        : jogo === "sflife"
        ? "./src/assets/sflpast.csv"
        : "./src/assets/future.csv";
  }
  return fs
    .readFileSync(nomeDoArquivo, "utf-8")
    .split(" ")
    .map((x) => +x)
    .filter((x) => {
      return !Number.isNaN(x);
    })
    .filter((x) => x !== 0);
}
function winningCombinantionValidator(
  jogo,
  myArray,
  arrayList,
  winCombination
) {
  let result;
  switch (winCombination.toLowerCase()) {
    case "1+2":
    case "2+2":
    case "4+2":
    case "5+2":
    case "6+2":
      result = filtrarPeloMaisDois(arrayList, myArray);
      break;
    case "2+1":
    case "3+1":
    case "4+1":
    case "5+1":
    case "5+1":
    case "6+1":
      result =
        jogo === "ozz"
          ? filtrarPeloMaisUmOzz(arrayList, myArray)
          : filtrarPeloMaisUm(arrayList, myArray);
      break;
    default:
      result = arrayList;
      break;
  }
  return result;
}
function selecionarSize(winCombination) {
  switch (winCombination) {
    case "1+2":
    case "2+1":
      return 3;
    case "3+1":
    case "2+2":
    case "4":
      return 4;
    case "3+2":
    case "4+1":
    case "5":
      return 5;
    default:
      return 6;
  }
}
function filtrarPeloMaisDois(arrayList, myArray) {
  return arrayList.filter((array) => {
    if (
      array.includes(myArray[myArray.length - 1]) &&
      array.includes(myArray[myArray.length - 2])
    )
      return true;
    else return false;
  });
}
function filtrarPeloMaisUm(arrayList, myArray) {
  return arrayList.filter((array) => {
    if (
      array.includes(myArray[myArray.length - 1]) ||
      array.includes(myArray[myArray.length - 2])
    )
      return true;
    else return false;
  });
}
function filtrarPeloMaisUmOzz(arrayList, myArray) {
  return arrayList.filter((array) => {
    if (
      array.includes(myArray[myArray.length - 1]) ||
      array.includes(myArray[myArray.length - 2]) ||
      array.includes(myArray[myArray.length - 3])
    )
      return true;
    else return false;
  });
}
function filtrarPeloMaisUmPB(arrayList, myArray) {
  return arrayList.filter((array) => {
    if (array[array.length - 1] === myArray[myArray.length - 1]) return true;
    else return false;
  });
}
module.exports = {
  retornaBolasRepetidas,
  verificaPast,
  verificaFuture,
  verificaPastJogos,
  verificaFuturoJogos,
};
