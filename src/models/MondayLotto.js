const { Schema, model } = require('mongoose')

const MondayLottoSchema =  new Schema({
  Game: String,
  Number: Number,
  DateTime: String,
  MainBalls: String,
  Supp: String
})

module.exports = model('MondayLotto', MondayLottoSchema)