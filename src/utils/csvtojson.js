const path = require("path");
const fs = require("fs");
const csvtojson = require("csvtojson");
const directoryPath = path.join(__dirname, "../", `assets`);
const https = require("https");
require("dotenv").config();
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

const getCsvFromUrl = async (nomeJogo) => {
  let url =
    nomeJogo === "monday"
      ? process.env.URL_MONDAY
      : nomeJogo === "ozz"
      ? process.env.URL_OZZ
      : nomeJogo === "wednesday"
      ? process.env.URL_WEDNESDAY
      : nomeJogo === "power"
      ? process.env.URL_POWER
      : nomeJogo === "saturday"
      ? process.env.URL_SATURDAY
      : "";
  try {
    const file = fs.createWriteStream(`${directoryPath}/${nomeJogo}.csv`);
    const request = https.get(url, function (response) {
      response.pipe(file);
    });
    await delay(6000);
    return request;
  } catch (error) {
    console.log(error);
  }
};

const readCsv = (nomeJogo) => {
  try {
    var data = fs
      .readFileSync(`${directoryPath}/${nomeJogo}.csv`, "utf8")
      .toString();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
module.exports = { mainCsvFromString, readCsv, getCsvFromUrl };
