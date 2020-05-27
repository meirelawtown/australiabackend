const csvtojson = require('csvtojson')
const SaturdayLotto = require('../models/SaturdayLotto.js')

const headerName = ['Game', 'Number', 'DateTime', 'MainBalls', 'Supp']


function mainCsvFromString(str) {

  return csvtojson({ noheader: false, headers: headerName })
    .fromString(str)
    .then(jogos => {
      return jogos
    })
}

module.exports = mainCsvFromString

