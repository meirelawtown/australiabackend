const PowerBallsSchema = require("../models/Pball");
const {
  mainCsvFromString,
  readCsv,
  getCsvFromUrl,
} = require("../utils/csvtojson");
const {
  retornaBolasRepetidas,
  verificaPast,
  verificaFuture,
} = require("../utils/jsontocsv.js");
const nomeDoJogo = "power";
class PowerBallController {
  async index(req, res) {
    const jogos = await PowerBallsSchema.find();
    let orderByNumber = jogos.sort((a, b) => a.Number - b.Number).reverse();
    return res.json(orderByNumber);
  }
  async store(req, res) {
    await getCsvFromUrl(nomeJogo);

    const data = readCsv(nomeJogo);

    const jogos = mainCsvFromString(nomeJogo, data);
    jogos.map(async (item) => {
      let jogo = await PowerBallsSchema.findOne(item).catch((e) => {
        if (e) throw e;
      });
      if (!jogo) {
        jogo = await PowerBallsSchema.create(item).catch((e) => {
          if (e) throw e;
        });
      }
    });
    return res.send();
  }
  async balls(req, res) {
    const jogos = await PowerBallsSchema.find();
    const repetidas = await retornaBolasRepetidas(nomeDoJogo, jogos);
    return res.json({ repetidas });
  }

  async pastBall(req, res) {
    const { id } = req.params;
    const jogo = await PowerBallsSchema.find({ Number: id });
    const result = await verificaPast(nomeDoJogo, jogo);
    res.json(result);
  }
  async futureBall(req, res) {
    const { id } = req.params;
    const jogo = await PowerBallsSchema.find({ Number: id });
    const result = await verificaFuture(nomeDoJogo, jogo);
    res.json(result);
  }
}

module.exports = new PowerBallController();
