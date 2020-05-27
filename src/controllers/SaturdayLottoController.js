const SaturdayLotto = require('../models/SaturdayLotto.js')
const mainCsvFromString = require('../utils/csvtojson')
const {retornaBolasRepetidas, verificaPast, verificaFuture} = require('../utils/jsontocsv.js')

class SaturdayLottoController {

  async store(req, res) {

    if (!req.files.myFile) {
      return res.status(400).json({ error: 'Arquivo inválido.' })
    }
    const data = req.files.myFile.data.toString().replace(/\"/g, "")
    const jogos = await mainCsvFromString(data)
    jogos.map(async item => {
      let jogo = await SaturdayLotto.findOne(item).catch(e => { if (e) throw e })
      if (!jogo) {
        jogo = await SaturdayLotto.create(item).catch(e => { if (e) throw e })
      }
    })

    return res.send()
  }

  async balls(req, res) {
    const jogos = await SaturdayLotto.find().catch(e => { if (e) throw e })

    const repetidas = await retornaBolasRepetidas(jogos)

    return res.json({ repetidas })
  }


  async index(req, res) {
    const jogo = await SaturdayLotto.find().catch(e => { if (e) throw e })
    let orderByNumber = await jogo.sort((a, b) => a.Number - b.Number).reverse()
    return res.json(orderByNumber)
  }

  async pastBall(req,res){
    const {id} = req.params
    const jogo = await SaturdayLotto.find({Number:id})
    const result = await verificaPast(jogo)
    res.json(result)
  }
  async futureBall(req,res){
    const {id} = req.params
    const jogo = await SaturdayLotto.find({Number:id})
    const result = await verificaFuture(jogo)
    res.json(result)
  }
}

module.exports = new SaturdayLottoController()

