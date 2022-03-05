const { Schema, model } = require("mongoose");

const PowerBallsSchema = new Schema({
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
});

module.exports = model("PowerBallLotto", PowerBallsSchema);
