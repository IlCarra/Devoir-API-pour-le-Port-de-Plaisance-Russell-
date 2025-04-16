var express = require('express');
var router = express.Router();

const resService = require('../services/reservations');

router.post('/:id/reservations', resService.createReservation);
router.get('/:id/reservations', resService.getAllReservations);
router.get('/:id/reservations/:idReservation', resService.getReservationById);
router.put('/:id/reservations/:idReservation', resService.updateReservation);
router.delete('/:id/reservations/:idReservation', resService.deleteReservation);

module.exports = router;