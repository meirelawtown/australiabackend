const csvtojson = require("csvtojson");

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

function mainCsvFromString(name, str) {
  var headerName;
  if (name === "ozz") {
    headerName = ozzHeader;
  } else if (name === "power") {
    headerName = powerHeader;
  } else {
    headerName = defaultHeader;
  }
  return csvtojson({ noheader: false, headers: headerName })
    .fromString(str)
    .then((jogos) => {
      return jogos;
    });
}

module.exports = mainCsvFromString;
