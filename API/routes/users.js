var express = require('express');
var router = express.Router();

const service = require('../services/users');
const User = require('../models/user');
const private = require('../middlewares/private');

/**
 * @route GET /users/{email}
 * @group Utilisateurs - Opérations sur les utilisateurs
 * @security bearerAuth
 * @param {string} email.path.required - L'adresse e-mail de l'utilisateur à récupérer
 * @returns {User} 200 - L'utilisateur trouvé
 * @returns {Error} 401 - Non autorisé
 * @returns {Error} 404 - Utilisateur non trouvé
*/
router.get('/:email', private.checkJWT, service.getByEmail);

/**
 * @route POST /users/add
 * @group Utilisateurs - Opérations sur les utilisateurs
 * @param {object} user.body.required - Détails de l'utilisateur à créer
 * @returns {User} 201 - L'utilisateur créé
 * @returns {Error} 400 - Requête invalide
*/
router.post('/add', service.add);

/**
 * @route PATCH /users/{email}
 * @group Utilisateurs - Opérations sur les utilisateurs
 * @security bearerAuth
 * @param {string} email.path.required - L'adresse e-mail de l'utilisateur à mettre à jour
 * @param {object} user.body - Détails de l'utilisateur à mettre à jour
 * @returns {User} 200 - L'utilisateur mis à jour
 * @returns {Error} 401 - Non autorisé
 * @returns {Error} 404 - Utilisateur non trouvé
 * @returns {Error} 400 - Requête invalide
*/
router.patch('/:email', private.checkJWT, service.update);

/**
 * @route DELETE /users/{email}
 * @group Utilisateurs - Opérations sur les utilisateurs
 * @security bearerAuth
 * @param {string} email.path.required - L'adresse e-mail de l'utilisateur à supprimer
 * @returns {object} 204 - Utilisateur supprimé (pas de contenu dans la réponse)
 * @returns {Error} 401 - Non autorisé
 * @returns {Error} 404 - Utilisateur non trouvé
*/
router.delete('/:email', private.checkJWT, service.delete); 

/**
 * @route GET /users
 * @group Utilisateurs - Opérations sur les utilisateurs
 * @security bearerAuth
 * @returns {Array<User>} 200 - Liste de tous les utilisateurs
 * @returns {Error} 401 - Non autorisé
 * @returns {Error} 500 - Erreur du serveur
*/
router.get('/', private.checkJWT, async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.error('Erreur lors de la récupération de tous les utilisateurs:', error);
        return res.status(500).json(error);
    }
});

/**
 * @route POST /authenticate
 * @group Authentification - Opérations d'authentification
 * @param {object} credentials.body.required - Identifiants pour l'authentification (e-mail et mot de passe)
 * @returns {object} 200 - Jeton JWT pour l'accès
 * @returns {Error} 400 - Identifiants invalides
 * @returns {Error} 401 - Non autorisé
*/
router.post('/authenticate', service.authenticate);

/**
 * @route GET /logout
 * @group Authentification - Opérations d'authentification
 * @returns {object} 200 - Déconnexion réussie
*/
router.get('/logout', service.logout);

module.exports = router;
