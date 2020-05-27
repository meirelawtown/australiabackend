const { Schema, model } = require('mongoose')

const OzzLottoSchema = new Schema({
  Game: String,
  Number: Number,
  DateTime: String,
  MainBalls: String,
  Supp: String
})

module.exports = model('OzzLotto', OzzLottoSchema)