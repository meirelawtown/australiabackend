const {
  findMonday,
  findWednesday,
  findPowerball,
  findSaturday,
  findsfLife,
  findOzz,
  addExport,
  validarBody,
} = require("../utils/permutaUtiils.js");

class PermutaController {
  async saturday(req, res) {
    if (!validarBody(req)) return res.status(400).send("Dados inválidos.");
    const { monday, ozz, wednesday, powerball, saturday, sfLife } = req.body;
    const mondayNumber = await findMonday(monday, res);
    const ozzNumber = await findOzz(ozz);
    const wednesdayNumber = await findWednesday(wednesday);
    const powerNumber = await findPowerball(powerball);
    const saturdayNumber = await findSaturday(saturday);
    const sfLifeNumber = await findsfLife(sfLife);

    if (
      mondayNumber.length === 0 ||
      ozzNumber.length === 0 ||
      wednesdayNumber.length === 0 ||
      powerNumber.length === 0 ||
      saturdayNumber.length === 0 ||
      sfLifeNumber.length === 0
    ) {
      return res.status(400).send("Dados inválidos.");
    }
    let exp = await addExport("saturday", saturday);

    let jogos = {
      monday: mondayNumber,
      ozz: ozzNumber,
      wednesday: wednesdayNumber,
      powerball: powerNumber,
      saturday: saturdayNumber,
      sfLife: sfLifeNumber,
      export: exp,
    };
    return res.json({ jogos });
  }
  async monday(req, res) {
    if (!validarBody(req)) return res.status(400).send("Dados inválidos.");
    const { monday, ozz, wednesday, powerball, saturday, sfLife } = req.body;
    const mondayNumber = await findMonday(monday, res);
    const ozzNumber = await findOzz(ozz);
    const wednesdayNumber = await findWednesday(wednesday);
    const powerNumber = await findPowerball(powerball);
    const saturdayNumber = await findSaturday(saturday);
    const sfLifeNumber = await findsfLife(sfLife);
    if (
      mondayNumber.length === 0 ||
      ozzNumber.length === 0 ||
      wednesdayNumber.length === 0 ||
      powerNumber.length === 0 ||
      saturdayNumber.length === 0 ||
      sfLifeNumber.length === 0
    ) {
      return res.status(400).send("Dados inválidos.");
    }
    let exp = await addExport("monday", monday);

    let jogos = {
      monday: mondayNumber,
      ozz: ozzNumber,
      wednesday: wednesdayNumber,
      powerball: powerNumber,
      saturday: saturdayNumber,
      sfLife: sfLifeNumber,
      export: exp,
    };
    return res.json({ jogos });
  }
  async wednesday(req, res) {
    if (!validarBody(req)) return res.status(400).send("Dados inválidos.");
    const { monday, ozz, wednesday, powerball, saturday, sfLife } = req.body;
    const mondayNumber = await findMonday(monday, res);
    const ozzNumber = await findOzz(ozz);
    const wednesdayNumber = await findWednesday(wednesday);
    const powerNumber = await findPowerball(powerball);
    const saturdayNumber = await findSaturday(saturday);
    const sfLifeNumber = await findsfLife(sfLife);

    if (
      mondayNumber.length === 0 ||
      ozzNumber.length === 0 ||
      wednesdayNumber.length === 0 ||
      powerNumber.length === 0 ||
      saturdayNumber.length === 0 ||
      sfLifeNumber.length === 0
    ) {
      return res.status(400).send("Dados inválidos.");
    }
    let exp = await addExport("wednesday", wednesday);

    let jogos = {
      monday: mondayNumber,
      ozz: ozzNumber,
      wednesday: wednesdayNumber,
      powerball: powerNumber,
      saturday: saturdayNumber,
      sfLife: sfLifeNumber,
      export: exp,
    };
    return res.json({ jogos });
  }
  async ozz(req, res) {
    if (!validarBody(req)) return res.status(400).send("Dados inválidos.");
    const { monday, ozz, wednesday, powerball, saturday, sfLife } = req.body;
    const mondayNumber = await findMonday(monday, res);
    const ozzNumber = await findOzz(ozz);
    const wednesdayNumber = await findWednesday(wednesday);
    const powerNumber = await findPowerball(powerball);
    const saturdayNumber = await findSaturday(saturday);
    const sfLifeNumber = await findsfLife(sfLife);

    if (
      mondayNumber.length === 0 ||
      ozzNumber.length === 0 ||
      wednesdayNumber.length === 0 ||
      powerNumber.length === 0 ||
      saturdayNumber.length === 0 ||
      sfLifeNumber.length === 0
    ) {
      return res.status(400).send("Dados inválidos.");
    }
    let exp = await addExport("ozz", ozz);

    let jogos = {
      monday: mondayNumber,
      ozz: ozzNumber,
      wednesday: wednesdayNumber,
      powerball: powerNumber,
      saturday: saturdayNumber,
      sfLife: sfLifeNumber,
      export: exp,
    };
    return res.json({ jogos });
  }
  async powerball(req, res) {
    if (!validarBody(req)) return res.status(400).send("Dados inválidos.");
    const { monday, ozz, wednesday, powerball, saturday, sfLife } = req.body;
    const mondayNumber = await findMonday(monday, res);
    const ozzNumber = await findOzz(ozz);
    const wednesdayNumber = await findWednesday(wednesday);
    const powerNumber = await findPowerball(powerball);
    const saturdayNumber = await findSaturday(saturday);
    const sfLifeNumber = await findsfLife(sfLife);

    if (
      mondayNumber.length === 0 ||
      ozzNumber.length === 0 ||
      wednesdayNumber.length === 0 ||
      powerNumber.length === 0 ||
      saturdayNumber.length === 0 ||
      sfLifeNumber.length === 0
    ) {
      return res.status(400).send("Dados inválidos.");
    }
    let exp = await addExport("power", powerball);

    let jogos = {
      monday: mondayNumber,
      ozz: ozzNumber,
      wednesday: wednesdayNumber,
      powerball: powerNumber,
      saturday: saturdayNumber,
      sfLife: sfLifeNumber,
      export: exp,
    };
    return res.json({ jogos });
  }
  async sfLife(req, res) {
    if (!validarBody(req)) return res.status(400).send("Dados inválidos.");
    const { monday, ozz, wednesday, powerball, saturday, sfLife } = req.body;
    const mondayNumber = await findMonday(monday, res);
    const ozzNumber = await findOzz(ozz);
    const wednesdayNumber = await findWednesday(wednesday);
    const powerNumber = await findPowerball(powerball);
    const saturdayNumber = await findSaturday(saturday);
    const sfLifeNumber = await findsfLife(sfLife);

    if (
      mondayNumber.length === 0 ||
      ozzNumber.length === 0 ||
      wednesdayNumber.length === 0 ||
      powerNumber.length === 0 ||
      saturdayNumber.length === 0 ||
      sfLifeNumber.length === 0
    ) {
      return res.status(400).send("Dados inválidos.");
    }
    let exp = await addExport("sfLife", sfLife);

    let jogos = {
      monday: mondayNumber,
      ozz: ozzNumber,
      wednesday: wednesdayNumber,
      powerball: powerNumber,
      saturday: saturdayNumber,
      sfLife: sfLifeNumber,
      export: exp,
    };
    return res.json({ jogos });
  }
}

module.exports = new PermutaController();
