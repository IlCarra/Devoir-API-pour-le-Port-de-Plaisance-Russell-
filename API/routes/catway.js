var express = require('express');
var router = express.Router();

const catService = require('../services/catway');
const resService = require('../services/reservations');

const private = require('../middlewares/private');

/**
 * @route POST /
 * @group Catways - Opérations sur les catways
 * @param {object} catway.body.required - Informations du catway à créer
 * @returns {Catway} 201 - Catway créé
 * @returns {Error} 400 - Requête invalide
 */
router.post('/', catService.createCatway);

/**
 * @route GET /
 * @group Catways - Opérations sur les catways
 * @returns {Array<Catway>} 200 - Liste de tous les catways
 * @returns {Error} 500 - Erreur serveur
 */
router.get('/', catService.getAllCatways);

/**
 * @route GET /{id}
 * @group Catways - Opérations sur les catways
 * @param {string} id.path.required - Numéro du catway à récupérer
 * @returns {Catway} 200 - Détails du catway
 * @returns {Error} 404 - Catway non trouvé
 * @returns {Error} 500 - Erreur serveur
 */
router.get('/:id', catService.getCatwayById);

/**
 * @route PUT /{id}
 * @group Catways - Opérations sur les catways
 * @param {string} id.path.required - Numéro du catway à mettre à jour
 * @param {object} catway.body.required - Nouvelles informations de l'état du catway
 * @returns {Catway} 200 - Catway mis à jour
 * @returns {Error} 400 - Requête invalide
 * @returns {Error} 404 - Catway non trouvé
 * @returns {Error} 500 - Erreur serveur
 */
router.put('/:id', catService.updateCatway);

/**
 * @route DELETE /{id}
 * @group Catways - Opérations sur les catways
 * @param {string} id.path.required - Numéro du catway à supprimer
 * @returns {object} 204 - Catway supprimé (pas de contenu)
 * @returns {Error} 404 - Catway non trouvé
 * @returns {Error} 500 - Erreur serveur
 */
router.delete('/:id', catService.deleteCatway);

/**
 * @route POST /{id}/reservations
 * @group Réservations - Opérations sur les réservations d'un catway
 * @param {string} id.path.required - Numéro du catway pour la réservation
 * @param {object} reservation.body.required - Informations de la réservation à créer
 * @returns {Reservation} 201 - Réservation créée
 * @returns {Error} 400 - Requête invalide
 * @returns {Error} 404 - Catway non trouvé
 * @returns {Error} 500 - Erreur serveur
 */
router.post('/:id/reservations', resService.createReservation);

/**
 * @route GET /{id}/reservations
 * @group Réservations - Opérations sur les réservations d'un catway
 * @param {string} id.path.required - Numéro du catway pour récupérer les réservations
 * @returns {Array<Reservation>} 200 - Liste des réservations pour ce catway
 * @returns {Error} 404 - Catway non trouvé
 * @returns {Error} 500 - Erreur serveur
 */
router.get('/:id/reservations', resService.getAllReservationsByCatway);

/**
 * @route GET /{id}/reservations/{idReservation}
 * @group Réservations - Opérations sur les réservations d'un catway
 * @param {string} id.path.required - Numéro du catway
 * @param {string} idReservation.path.required - ID de la réservation à récupérer
 * @returns {Reservation} 200 - Détails de la réservation
 * @returns {Error} 404 - Catway ou réservation non trouvée
 * @returns {Error} 500 - Erreur serveur
 */
router.get('/:id/reservations/:idReservation', resService.getReservationById);

/**
 * @route PUT /{id}/reservations/{idReservation}
 * @group Réservations - Opérations sur les réservations d'un catway
 * @param {string} id.path.required - Numéro du catway
 * @param {string} idReservation.path.required - ID de la réservation à mettre à jour
 * @param {object} reservation.body.required - Nouvelles informations de la réservation
 * @returns {Reservation} 200 - Réservation mise à jour
 * @returns {Error} 400 - Requête invalide
 * @returns {Error} 404 - Catway ou réservation non trouvée
 * @returns {Error} 500 - Erreur serveur
 */
router.put('/:id/reservations/:idReservation', resService.updateReservation);

/**
 * @route DELETE /{id}/reservations/{idReservation}
 * @group Réservations - Opérations sur les réservations d'un catway
 * @param {string} id.path.required - Numéro du catway
 * @param {string} idReservation.path.required - ID de la réservation à supprimer
 * @returns {object} 204 - Réservation supprimée (pas de contenu)
 * @returns {Error} 404 - Catway ou réservation non trouvée
 * @returns {Error} 500 - Erreur serveur
 */
router.delete('/:id/reservations/:idReservation', resService.deleteReservation);

/**
 * @route GET /reservations/current
 * @group Réservations - Opérations sur les réservations
 * @security bearerAuth
 * @returns {Array<Reservation>} 200 - Liste des réservations en cours
 * @returns {Error} 401 - Non autorisé
 * @returns {Error} 500 - Erreur serveur
 */
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