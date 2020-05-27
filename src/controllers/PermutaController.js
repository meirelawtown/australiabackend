const WednesdayLotto = require('../models/WednesdayLotto')
const PowerBallsSchema = require('../models/Pball')
const OzzLotto = require('../models/OzzLotto')
const SaturdayLotto = require('../models/SaturdayLotto.js')
const MondayLotto = require('../models/MondayLotto')
const { retornaBolasRepetidas, verificaPast, verificaFuture } = require('../utils/jsontocsv.js')


class PermutaController {

  async saturday(req, res) {
    let jogos = {}
    const { monday, ozz, wednesday, powerball, saturday } = req.body
    if(!monday || !ozz|| !wednesday || !powerball|| !saturday ){
      return res.status(400).send('Dados inválidos.')
    }
    const mondayNumber = await MondayLotto.find({ Number: monday })
    const ozzNumber = await OzzLotto.find({ Number: ozz })
    const wednesdayNumber = await WednesdayLotto.find({ Number: wednesday })
    const powerNumber = await PowerBallsSchema.find({ Number: powerball })
    const saturdayNumber = await SaturdayLotto.find({ Number: saturday })
    if(mondayNumber.length === 0 || ozzNumber.length === 0 || wednesdayNumber.length === 0 || powerNumber.length === 0 || saturdayNumber.length === 0  ){
      return res.status(400).send('Dados inválidos.')
    }
    jogos.monday = mondayNumber
    jogos.ozz = ozzNumber
    jogos.wednesday = wednesdayNumber
    jogos.powerball = powerNumber
    jogos.saturday = saturdayNumber

    let saturdays = saturday
    
    let n = []

    for (let i = 0; i < 5; i++) {
      const results = await SaturdayLotto.find({ Number: saturdays })
      let p = await verificaPast(results)
      let f = await verificaFuture(results)
      const {MainBalls, Supp} = results[0]
      n.push({number:saturdays,MainBalls, Supp, p, f})
      saturdays -= 2
    }
    jogos.export = n
    return res.json({ jogos })
  }
  async monday(req, res) {
    let jogos = {}
    const { monday, ozz, wednesday, powerball, saturday } = req.body
    if(!monday || !ozz|| !wednesday || !powerball|| !saturday ){
      return res.status(400).send('Dados inválidos.')
    }
    const mondayNumber = await MondayLotto.find({ Number: monday })
    const ozzNumber = await OzzLotto.find({ Number: ozz })
    const wednesdayNumber = await WednesdayLotto.find({ Number: wednesday })
    const powerNumber = await PowerBallsSchema.find({ Number: powerball })
    const saturdayNumber = await SaturdayLotto.find({ Number: saturday })
    if(mondayNumber.length === 0 || ozzNumber.length === 0 || wednesdayNumber.length === 0 || powerNumber.length === 0 || saturdayNumber.length === 0  ){
      return res.status(400).send('Dados inválidos.')
    }
    jogos.monday = mondayNumber
    jogos.ozz = ozzNumber
    jogos.wednesday = wednesdayNumber
    jogos.powerball = powerNumber
    jogos.saturday = saturdayNumber

    let mondays = monday
    
    let n = []

    for (let i = 0; i < 5; i++) {
      const results = await MondayLotto.find({ Number: mondays })
      let p = await verificaPast(results)
      let f = await verificaFuture(results)
      const {MainBalls, Supp} = results[0]
      n.push({number:mondays,MainBalls, Supp, p, f})
      mondays -= 2
    }
    jogos.export = n
    return res.json({ jogos })
  }
  async wednesday(req,res){
    let jogos = {}
    const { monday, ozz, wednesday, powerball, saturday } = req.body
    if(!monday || !ozz|| !wednesday || !powerball|| !saturday ){
      return res.status(400).send('Dados inválidos.')
    }
    const mondayNumber = await MondayLotto.find({ Number: monday })
    const ozzNumber = await OzzLotto.find({ Number: ozz })
    const wednesdayNumber = await WednesdayLotto.find({ Number: wednesday })
    const powerNumber = await PowerBallsSchema.find({ Number: powerball })
    const saturdayNumber = await SaturdayLotto.find({ Number: saturday })
    if(mondayNumber.length === 0 || ozzNumber.length === 0 || wednesdayNumber.length === 0 || powerNumber.length === 0 || saturdayNumber.length === 0  ){
      return res.status(400).send('Dados inválidos.')
    }
    jogos.monday = mondayNumber
    jogos.ozz = ozzNumber
    jogos.wednesday = wednesdayNumber
    jogos.powerball = powerNumber
    jogos.saturday = saturdayNumber

    let wednesdays = wednesday
    
    let n = []

    for (let i = 0; i < 5; i++) {
      const results = await WednesdayLotto.find({ Number: wednesdays })
      if(!monday || !ozz|| !wednesday || !powerball|| !saturday ){
        return res.status(400).send('Dados inválidos.')
      }
      let p = await verificaPast(results)
      let f = await verificaFuture(results)
      const {MainBalls, Supp} = results[0]
      n.push({number:wednesdays,MainBalls, Supp, p, f})
      wednesdays -= 2
    }
    jogos.export = n
    return res.json({ jogos })
  }
  async ozz(req,res){
    let jogos = {}
    const { monday, ozz, wednesday, powerball, saturday } = req.body
    if(!monday || !ozz|| !wednesday || !powerball|| !saturday ){
      return res.status(400).send('Dados inválidos.')
    }
    const mondayNumber = await MondayLotto.find({ Number: monday })
    const ozzNumber = await OzzLotto.find({ Number: ozz })
    const wednesdayNumber = await WednesdayLotto.find({ Number: wednesday })
    const powerNumber = await PowerBallsSchema.find({ Number: powerball })
    const saturdayNumber = await SaturdayLotto.find({ Number: saturday })
    if(mondayNumber.length === 0 || ozzNumber.length === 0 || wednesdayNumber.length === 0 || powerNumber.length === 0 || saturdayNumber.length === 0  ){
      return res.status(400).send('Dados inválidos.')
    }
    jogos.monday = mondayNumber
    jogos.ozz = ozzNumber
    jogos.wednesday = wednesdayNumber
    jogos.powerball = powerNumber
    jogos.saturday = saturdayNumber

    let ozzs = ozz
    
    let n = []

    for (let i = 0; i < 5; i++) {
      const results = await OzzLotto.find({ Number: ozzs })
      let p = await verificaPast(results)
      let f = await verificaFuture(results)
      const {MainBalls, Supp} = results[0]
      n.push({number:ozzs,MainBalls, Supp, p, f})
      ozzs -= 2
    }
    jogos.export = n
    return res.json({ jogos })
  }
  async powerball(req,res){
    let jogos = {}
    const { monday, ozz, wednesday, powerball, saturday } = req.body
    if(!monday || !ozz|| !wednesday || !powerball|| !saturday ){
      return res.status(400).send('Dados inválidos.')
    }
    const mondayNumber = await MondayLotto.find({ Number: monday })
    const ozzNumber = await OzzLotto.find({ Number: ozz })
    const wednesdayNumber = await WednesdayLotto.find({ Number: wednesday })
    const powerNumber = await PowerBallsSchema.find({ Number: powerball })
    const saturdayNumber = await SaturdayLotto.find({ Number: saturday })
    if(mondayNumber.length === 0 || ozzNumber.length === 0 || wednesdayNumber.length === 0 || powerNumber.length === 0 || saturdayNumber.length === 0  ){
      return res.status(400).send('Dados inválidos.')
    }
    jogos.monday = mondayNumber
    jogos.ozz = ozzNumber
    jogos.wednesday = wednesdayNumber
    jogos.powerball = powerNumber
    jogos.saturday = saturdayNumber

    let powerballs = powerball
    
    let n = []

    for (let i = 0; i < 5; i++) {
      const results = await PowerBallsSchema.find({ Number: powerball })
      let p = await verificaPast(results)
      let f = await verificaFuture(results)
      const {MainBalls, Supp} = results[0]
      n.push({number:powerballs,MainBalls, Supp, p, f})
      powerballs -= 2
    }
    jogos.export = n
    return res.json({ jogos })
  }
}

module.exports = new PermutaController