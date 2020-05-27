const { Schema, model} = require('mongoose')

const WednesdayLottoSchema = new Schema({
  Game: String,
  Number: Number,
  DateTime: String,
  MainBalls: String,
  Supp: String
})

module.exports = model('WednesdayLotto', WednesdayLottoSchema)