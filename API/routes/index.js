var express = require('express');
var router = express.Router();

const userRoute = require('../routes/users');
const catwayRoute = require('../routes/catway');

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

module.exports = router;
