var express = require('express');
var router = express.Router();

const catService = require('../services/catway');
const resService = require('../services/reservations');

console.log('Catway Router attivo!');

router.post('/', catService.createCatway);
router.get('/', catService.getAllCatways);
router.get('/:id', catService.getCatwayById);
router.put('/:id', catService.updateCatway);
router.delete('/:id', catService.deleteCatway);

console.log('Tentativo di accedere a /catways/:id/reservations');

router.post('/:id/reservations', resService.createReservation);
router.get('/:id/reservations', resService.getAllReservationsByCatway);
router.get('/:id/reservations/:idReservation', resService.getReservationById);
router.put('/:id/reservations/:idReservation', resService.updateReservation);
router.delete('/:id/reservations/:idReservation', resService.deleteReservation);

console.log('Accesso a /catways/:id/reservations eseguito !')

module.exports = router;