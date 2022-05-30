const { Schema, model } = require("mongoose");

const SFLifeSchema = new Schema({
  Number: String,
  DateTime: String,
  Main1: String,
  Main2: String,
  Main3: String,
  Main4: String,
  Main5: String,
  Main6: String,
  Main7: String,
  Supp1: String,
  Supp2: String,
});

module.exports = model("SFLife", SFLifeSchema);
