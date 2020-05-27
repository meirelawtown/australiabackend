const MondayLotto = require('../models/MondayLotto')
const mainCsvFromString = require('../utils/csvtojson')
const {retornaBolasRepetidas, verificaPast, verificaFuture} = require('../utils/jsontocsv.js')


class MondayLottoController{

  async index(req, res){

    const jogos = await MondayLotto.find()
    let orderByNumber = jogos.sort((a, b) => a.Number - b.Number).reverse()
    
    return res.json(orderByNumber)
  }

  async store(req, res){

    if(!req.files.myFile){
      return res.status(400).json({error: 'Arquivo inválido.'})
    }
    const data = req.files.myFile.data.toString().replace(/\"/g, "")
    const jogos = await mainCsvFromString(data)
    jogos.map(async item => {
      let jogo = await MondayLotto.findOne(item).catch(e => { if (e) throw e })
      if (!jogo) {
        jogo = await MondayLotto.create(item).catch(e => { if (e) throw e })
      }
    })

    return res.send()
  }

  async balls(req, res){

    const jogos = await MondayLotto.find().catch(e => {if(e) throw e})
    const repetidas = await retornaBolasRepetidas(jogos)

    return res.json({ repetidas })
  }

  async pastBall(req,res){
    const {id} = req.params
    const jogo = await MondayLotto.find({Number:id})
    const result = await verificaPast(jogo)
    res.json(result)
  }
  async futureBall(req,res){
    const {id} = req.params
    const jogo = await MondayLotto.find({Number:id})
    const result = await verificaFuture(jogo)
    res.json(result)
  }
}

module.exports = new MondayLottoController