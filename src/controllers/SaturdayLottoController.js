const SaturdayLotto = require("../models/SaturdayLotto.js");
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
const nomeJogo = "saturday";
class SaturdayLottoController {
  async store(req, res) {
    await getCsvFromUrl(nomeJogo);

    const data = readCsv(nomeJogo);

    const jogos = mainCsvFromString(nomeJogo, data);
    jogos.map(async (item) => {
      let jogo = await SaturdayLotto.findOne({ Number: item.Number }).catch(
        (e) => {
          if (e) throw e;
        }
      );
      if (!jogo && item.Number > 4000) {
        jogo = await SaturdayLotto.create(item).catch((e) => {
          if (e) throw e;
        });
      }
    });

    return res.send();
  }

  async balls(req, res) {
    const jogos = await SaturdayLotto.find().catch((e) => {
      if (e) throw e;
    });

    const repetidas = await retornaBolasRepetidas(nomeJogo, jogos);

    return res.json({ repetidas });
  }

  async index(req, res) {
    let query = { Number: { $gt: "4200" } };

    const jogos = await SaturdayLotto.find(query)
      .sort({ Number: -1 })
      .limit(20);
    return res.json(jogos);
  }

  async pastBall(req, res) {
    const { id } = req.params;
    const jogo = await SaturdayLotto.find({ Number: id });
    const result = await verificaPast(nomeJogo, jogo);
    res.json(result);
  }
  async futureBall(req, res) {
    const { id } = req.params;
    const jogo = await SaturdayLotto.find({ Number: id });

    const result = await verificaFuture(nomeJogo, jogo);
    res.json(result);
  }
}

module.exports = new SaturdayLottoController();
