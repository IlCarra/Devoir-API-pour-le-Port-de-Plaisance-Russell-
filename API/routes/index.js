var express = require('express');
var router = express.Router();

const userRoute = require('../routes/users');
const catwayRoute = require('../routes/catway');
const reservationRoute = require('../routes/reservation');

router.get('/', async (req, res) => {
  res.status(200).json({
    name: process.env.APP_NAME,
    version: '1.0',
    status: 200,
    message: 'Bienvenue sur l\'API !'
  });
});

router.use('/users', userRoute);
router.use('/catway', catwayRoute);
router.use('/reservation', reservationRoute);

module.exports = router;
