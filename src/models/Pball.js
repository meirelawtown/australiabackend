const { Schema, model} = require('mongoose')

const PowerBallsSchema = new Schema({
  Game: String,
  Number: Number,
  DateTime: String,
  MainBalls: String,
  Supp: String
})

module.exports = model('PowerBallLotto', PowerBallsSchema)