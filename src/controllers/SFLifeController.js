const SFLife = require("../models/SFLife");
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
const nomeJogo = "sflife";
class SFLifeController {
  async index(req, res) {
    let query = { Number: { $gt: "2400" } };

    const jogos = await SFLife.find(query).sort({ Number: -1 }).limit(20);
    // const jogos = await SFLife.find();

    // let orderByNumber = jogos.sort((a, b) => a.Number - b.Number).reverse();
    return res.json(jogos);
  }

  async store(req, res) {
    await getCsvFromUrl(nomeJogo);

    const data = readCsv(nomeJogo);

    const jogos = mainCsvFromString(nomeJogo, data);
    jogos.map(async (item) => {
      let jogo = await SFLife.findOne({ Number: item.Number }).catch((e) => {
        if (e) throw e;
      });
      if (!jogo && item.Number > 2400) {
        jogo = await SFLife.create(item).catch((e) => {
          if (e) throw e;
        });
      }
    });
    return res.send();
  }

  async balls(req, res) {
    const jogos = await SFLife.find();
    const repetidas = await retornaBolasRepetidas(nomeJogo, jogos);

    return res.json({ repetidas });
  }
  async pastBall(req, res) {
    const { id } = req.params;
    const jogo = await SFLife.find({ Number: id });
    const result = await verificaPast(nomeJogo, jogo);
    res.json(result);
  }
  async futureBall(req, res) {
    const { id } = req.params;
    const jogo = await SFLife.find({ Number: id });
    const result = await verificaFuture(nomeJogo, jogo);
    res.json(result);
  }
}

module.exports = new SFLifeController();
