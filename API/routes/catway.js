var express = require('express');
var router = express.Router();

const catService = require('../services/catway');

router.post('/', catService.createCatway);
router.get('/', catService.getAllCatways);
router.get('/:id', catService.getCatwayById);
router.put('/:id', catService.updateCatway);
router.delete('/:id', catService.deleteCatway);

module.exports = router;