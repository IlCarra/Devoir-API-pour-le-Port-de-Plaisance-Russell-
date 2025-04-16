const Reservations = require('../models/reservations');

//Créer une reservation
exports.createReservation = async (req, res, next) => {
    const temp = ({
        catwayNumber: req.params.id,
        ...req.body
    });

    try {
        let reservation = await Reservations.create(temp);

        return res.status(201).json(reservation);
    } catch (error) {
        return res.status(500).json(error);
    }
}

//Obtenir toutes les reservations pour un catway
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservations.find({
            catwayNumber: req.params.id
        });
        res.json(reservations);
    } catch (error) {
        res.status(500).json(error);
    }
}

//Obtenir une reservation avec l'id du catway et l'id de reservation
exports.getReservationById = async (req, res) => {
    try {
        const reservation = Reservations.findOne({
            catwayNumber: req.params.id,
            _id: req.params.idReservation
        });
        if (!reservation) {
            return res.status(404).json('reservation_not_found');
        }
        res.json(reservation);
    } catch (error) {
        return res.status(500).json(error)
    }
}

//Modifier une reservation
exports.updateReservation = async (req, res) => {
    try {
        const reservation = await Reservations.findOneAndUpdate({ 
                catwayNumber: req.params.id, 
                _id: req.params.idReservation 
            },
            req.body,
            { new: true }
        );
        if (!reservation) {
            return res.status(404).json('reservation_not_found');
        }
        res.json(reservation);
    } catch (error) {
        res.status(400).json(error);
    }
}

//Eliminer une reservation
exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservations.deleteOne({
            catwayNumber: req.params.id,
            _id: req.params.idReservation
        });
        if (!reservation) {
            return res.status(404).json('reservation_not_found');
        }
        res.json('reservation_deleted');
    } catch (error) {
        res.status(500).json(error);
    }
}

