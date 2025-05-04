const Catways = require('../models/catway');

exports.createCatway = async (req, res, next) => {
    const temp = ({
        catwayNumber: req.body.catwayNumber,
        catwayType: req.body.catwayType,
        catwayState: req.body.catwayState
    });

    try {
        let catway = await Catways.create(temp);

        return res.status(201).json(catway);
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.getAllCatways = async (req, res) => {
    try {
        const catways = await Catways.find();
        res.json(catways);
    } catch (error) {
        res.status(500).json(error);
    }
};


exports.getCatwayById = async (req, res) => {
    const id = req.params.id;

    try {
        let catway = await Catways.findById(id);

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

    const temp = ({
        catwayNumber: req.body.catwayNumber,
        catwayType: req.body.catwayType,
        catwayState: req.body.catwayState
    });
    try {
        const updatedCatway = await Catways.findByIdAndUpdate(id, temp, { new: true });

        if (!updatedCatway) {
            return res.status(404).json('catway_not_found');
        }
        res.status(200).json(updatedCatway);
    } catch (error) {
        res.status(500).json('internal_server_error');
    }
}

exports.deleteCatway = async (req, res, next) => {
    const id = req.params.id

    try {
        const deletedCatway = await Catways.findByIdAndDelete(id);

        if (!deletedCatway) {
            return res.status(404).json('catway_not_found');
        }

        return res.status(204).send();
    } catch (error) {
        res.status(500).json('internal_erver_error');
    }
}