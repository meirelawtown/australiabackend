const {Schema, model} = require('mongoose')

const SaturdayLottoSchema = new Schema({
  Game:  String,
  Number: Number,
  DateTime: String,
  MainBalls: String,
  Supp: String
})

module.exports = model('SaturdayLotto', SaturdayLottoSchema)