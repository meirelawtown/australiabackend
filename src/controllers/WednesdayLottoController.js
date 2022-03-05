const WednesdayLotto = require("../models/WednesdayLotto");
const mainCsvFromString = require("../utils/csvtojson");
const {
  retornaBolasRepetidas,
  verificaPast,
  verificaFuture,
} = require("../utils/jsontocsv.js");
const nomeDoJogo = "wednesday";
class WednesdayLottoController {
  async index(req, res) {
    const jogos = await WednesdayLotto.find();
    const orderByNuber = jogos.sort((a, b) => a.Number - b.Number).reverse();
    return res.json(orderByNuber);
  }
  async balls(req, res) {
    const jogos = await WednesdayLotto.find();

    const repetidas = await retornaBolasRepetidas(nomeDoJogo, jogos);

    return res.json({ repetidas });
  }
  async store(req, res) {
    if (!req.files.myFile) {
      return res.status(400).json({ error: "Arquivo inválido." });
    }

    const data = req.files.myFile.data.toString().replace(/\"/g, "");

    const jogos = mainCsvFromString(nomeDoJogo, data);
    jogos.map(async (item) => {
      let jogo = await WednesdayLotto.findOne(item).catch((e) => {
        if (e) throw e;
      });
      if (!jogo) {
        jogo = await WednesdayLotto.create(item).catch((e) => {
          if (e) throw e;
        });
      }
    });
    return res.send();
  }

  async pastBall(req, res) {
    const { id } = req.params;
    const jogo = await WednesdayLotto.find({ Number: id });
    const result = await verificaPast(nomeDoJogo, jogo);
    res.json(result);
  }
  async futureBall(req, res) {
    const { id } = req.params;
    const jogo = await WednesdayLotto.find({ Number: id });
    const result = await verificaFuture(nomeDoJogo, jogo);
    res.json(result);
  }
}

module.exports = new WednesdayLottoController();
