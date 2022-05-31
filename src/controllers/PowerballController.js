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
const nomeJogo = "power";
class PowerBallController {
  async index(req, res) {
    let query = { Number: { $gt: "1300" } };

    const jogos = await PowerBallsSchema.find(query)
      .sort({ Number: -1 })
      .limit(20);
    // const jogos = await PowerBallsSchema.find();
    // let orderByNumber = jogos.sort((a, b) => a.Number - b.Number).reverse();
    return res.json(jogos);
  }
  async store(req, res) {
    await getCsvFromUrl(nomeJogo);

    const data = readCsv(nomeJogo);

    const jogos = mainCsvFromString(nomeJogo, data);
    jogos.map(async (item) => {
      let jogo = await PowerBallsSchema.findOne({ Number: item.Number }).catch(
        (e) => {
          if (e) throw e;
        }
      );
      if (!jogo && item.Number > 1300) {
        jogo = await PowerBallsSchema.create(item).catch((e) => {
          if (e) throw e;
        });
      }
    });
    return res.send();
  }
  async balls(req, res) {
    const jogos = await PowerBallsSchema.find();
    const repetidas = await retornaBolasRepetidas(nomeJogo, jogos);
    return res.json({ repetidas });
  }

  async pastBall(req, res) {
    const { id } = req.params;
    const jogo = await PowerBallsSchema.find({ Number: id });
    const result = await verificaPast(nomeJogo, jogo);
    res.json(result);
  }
  async futureBall(req, res) {
    const { id } = req.params;
    const jogo = await PowerBallsSchema.find({ Number: id });
    const result = await verificaFuture(nomeJogo, jogo);
    res.json(result);
  }
}

module.exports = new PowerBallController();
