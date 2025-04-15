const Catway = require('../models/catway');

//Créer un nouveau Catway
exports.createCatway = async (req, res, next) => {
    const temp = ({
        catwayNumber: req.body.catwayNumber,
        catwayType: req.body.catwayType,
        catwayState: req.body.catwayState
    });

    try {
        let catway = await Catway.create(temp);

        return res.status(201).json(catway);
    } catch (error) {
        return res.status(500).json(error);
    }
}

//Obtenir les catways
exports.getAllCatways = async (req, res) => {
    try {
        const catways = await Catway.find();
        res.json('catways');
    } catch (error) {
        res.status(500).json(error);
    }
};

//Recuperer un catway avec son id
exports.getCatwayById = async (req, res) => {
    const id = req.params.id;

    try {
        let catway = await Catway.findById(id);

        if (catway) {
            return res.status(200).json(catway);
        }

        return res.status(404).json('catway_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.updateCatway = async (req, res, next) => {
    const id = req.params.id

    try {
    const temp = ({
        catwayNumber: req.body.catwayNumber,
        catwayType: req.body.catwayType,
        catwayState: req.body.catwayState
    });

    if (!catway) {
        return res.status(404).json('catway_not_found');
    }
    res.json(catway);
    } catch (error){
        res.status(400).json(error);
    }
}

exports.deleteCatway = async (req, res, next) => {
    const catwayNumber = req.params.id

    try {
        await Catway.deleteOne({ catwayNumber: catwayNumber});

        if (result.deletedCount === 0) {
            return res.status(404).json('Catway not found');
        }

        return res.status(204).json('delete_ok');
    } catch (error) {
        res.status(501).json(error);
    }
}