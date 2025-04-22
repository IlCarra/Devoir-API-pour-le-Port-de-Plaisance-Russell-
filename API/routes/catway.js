var express = require('express');
var router = express.Router();

const catService = require('../services/catway');
const resService = require('../services/reservations');

const private = require('../middlewares/private');

console.log('Catway Router attivo!');

router.post('/', catService.createCatway);
router.get('/', catService.getAllCatways);
router.get('/:id', catService.getCatwayById);
router.put('/:id', catService.updateCatway);
router.delete('/:id', catService.deleteCatway);

router.post('/:id/reservations', resService.createReservation);
router.get('/:id/reservations', resService.getAllReservationsByCatway);
router.get('/:id/reservations/:idReservation', resService.getReservationById);
router.put('/:id/reservations/:idReservation', resService.updateReservation);
router.delete('/:id/reservations/:idReservation', resService.deleteReservation);

router.get('/reservations/current', private.checkJWT, async (req, res) => {
    try {
        const now = new Date();
        const currentReservations = await resService.getCurrentReservations(now);
        res.json(currentReservations);
    } catch (error) {
        console.error('Erreur lors de la récupération des réservations en cours:', error);
        res.status(500).json(error);
    }
});

module.exports = router;