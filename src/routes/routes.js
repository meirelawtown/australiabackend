const Router = require('express') 

const routes = new Router()

const SaturdayLottoController = require('../controllers/SaturdayLottoController')
const MondayLottoController = require('../controllers/MondayLottoController')
const OzzLottoController = require('../controllers/OzzLottoController')
const WednesdayLottoController = require('../controllers/WednesdayLottoController')
const PowerballLottoController = require('../controllers/PowerballController')
const PermutaController = require('../controllers/PermutaController')

routes.post('/saturdaylotto',SaturdayLottoController.store)
routes.get('/saturdaylotto',SaturdayLottoController.index)
routes.get('/saturdaylotto/repetidas',SaturdayLottoController.balls)
routes.get('/saturdaylottopast/:id',SaturdayLottoController.pastBall)
routes.get('/saturdaylottofuture/:id',SaturdayLottoController.futureBall)

routes.post('/mondaylotto',MondayLottoController.store)
routes.get('/mondaylotto', MondayLottoController.index)
routes.get('/mondaylotto/repetidas',MondayLottoController.balls)
routes.get('/mondaylottopast/:id',MondayLottoController.pastBall)
routes.get('/mondaylottofuture/:id',MondayLottoController.futureBall)

routes.post('/ozzlotto',OzzLottoController.store)
routes.get('/ozzlotto', OzzLottoController.index)
routes.get('/ozzlotto/repetidas',OzzLottoController.balls)
routes.get('/ozzlottopast/:id',OzzLottoController.pastBall)
routes.get('/ozzlottofuture/:id',OzzLottoController.futureBall)

routes.post('/wednesdaylotto',WednesdayLottoController.store)
routes.get('/wednesdaylotto', WednesdayLottoController.index)
routes.get('/wednesdaylotto/repetidas',WednesdayLottoController.balls)
routes.get('/wednesdaylottopast/:id',WednesdayLottoController.pastBall)
routes.get('/wednesdaylottofuture/:id',WednesdayLottoController.futureBall)

routes.post('/powerballlotto',PowerballLottoController.store)
routes.get('/powerballlotto', PowerballLottoController.index)
routes.get('/powerballlotto/repetidas',PowerballLottoController.balls)

routes.post('/permuta/saturday',PermutaController.saturday)
routes.post('/permuta/monday',PermutaController.monday)
routes.post('/permuta/wednesday',PermutaController.wednesday)
routes.post('/permuta/ozz',PermutaController.ozz)
routes.post('/permuta/powerball',PermutaController.powerball)


module.exports = routes
