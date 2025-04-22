var express = require('express');
var router = express.Router();

const service = require('../services/users');
const User = require('../models/user');
const private = require('../middlewares/private');

router.get('/:email', private.checkJWT, service.getByEmail);
router.post('/add', service.add);
router.patch('/:email', private.checkJWT, service.update);
router.delete('/:email', private.checkJWT, service.delete); 

router.get('/', private.checkJWT, async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.error('Erreur lors de la récupération de tous les utilisateurs:', error);
        return res.status(500).json(error);
    }
});

router.post('/authenticate', service.authenticate);
router.get('/logout', service.logout);

module.exports = router;
