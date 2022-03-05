const WednesdayLotto = require("../models/WednesdayLotto");
const PowerBallsSchema = require("../models/Pball");
const OzzLotto = require("../models/OzzLotto");
const SaturdayLotto = require("../models/SaturdayLotto.js");
const MondayLotto = require("../models/MondayLotto");
const { verificaPast, verificaFuture } = require("../utils/jsontocsv.js");

const findMonday = async (number, res) => {
  return await MondayLotto.find({ Number: number });
};

const findOzz = async (number) => {
  return await OzzLotto.find({ Number: number });
};
const findWednesday = async (number) => {
  return await WednesdayLotto.find({ Number: number });
};
const findPowerball = async (number) => {
  return await PowerBallsSchema.find({ Number: number });
};

const findSaturday = async (number) => {
  return await SaturdayLotto.find({ Number: number });
};
const findGameByName = async (nomeDoJogo, jogo) => {
  if (nomeDoJogo === "monday") {
    return await findMonday(jogo);
  } else if (nomeDoJogo === "ozz") {
    return await findOzz(jogo);
  } else if (nomeDoJogo === "wednesday") {
    return await findWednesday(jogo);
  } else if (nomeDoJogo === "power") {
    return await findPowerball(jogo);
  } else if (nomeDoJogo === "saturday") {
    return await findSaturday(jogo);
  }
};

const addExport = async (nomeDoJogo, jogo) => {
  let jogos = jogo;
  let n = [];
  for (let i = 0; i < 5; i++) {
    const results = await findGameByName(nomeDoJogo, jogo);
    let p = await verificaPast(nomeDoJogo, results);
    let f = await verificaFuture(nomeDoJogo, results);
    const { Main1, Main2, Main3, Main4, Main5, Main6, Main7, Supp1, Supp2 } =
      results[0];
    n.push({
      number: jogos,
      Main1,
      Main2,
      Main3,
      Main4,
      Main5,
      Main6,
      Main7,
      Supp1,
      Supp2,
      p,
      f,
    });
    jogos -= 2;
  }
  return n;
};
const validarBody = (req) => {
  const { monday, ozz, wednesday, powerball, saturday } = req.body;
  if (!monday || !ozz || !wednesday || !powerball || !saturday) {
    return false;
  }
  return true;
};
module.exports = {
  findMonday,
  findOzz,
  findWednesday,
  findPowerball,
  findSaturday,
  addExport,
  validarBody,
};
