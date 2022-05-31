const WednesdayLotto = require("../models/WednesdayLotto");
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
const nomeJogo = "wednesday";
class WednesdayLottoController {
  async index(req, res) {
    let query = { Number: { $gt: "4100" } };

    const jogos = await WednesdayLotto.find(query).sort({ Number: -1 });
    // const jogos = await WednesdayLotto.find();
    // const orderByNuber = jogos.sort((a, b) => a.Number - b.Number).reverse();
    return res.json(jogos);
  }
  async balls(req, res) {
    const jogos = await WednesdayLotto.find();

    const repetidas = await retornaBolasRepetidas(nomeJogo, jogos);

    return res.json({ repetidas });
  }
  async store(req, res) {
    await getCsvFromUrl(nomeJogo);

    const data = readCsv(nomeJogo);

    const jogos = mainCsvFromString(nomeJogo, data);
    jogos.map(async (item) => {
      let jogo = await WednesdayLotto.findOne({ Number: item.Number }).catch(
        (e) => {
          if (e) throw e;
        }
      );
      if (!jogo && item.Number > 4000) {
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
    const result = await verificaPast(nomeJogo, jogo);
    res.json(result);
  }
  async futureBall(req, res) {
    const { id } = req.params;
    const jogo = await WednesdayLotto.find({ Number: id });
    const result = await verificaFuture(nomeJogo, jogo);
    res.json(result);
  }
}

module.exports = new WednesdayLottoController();
