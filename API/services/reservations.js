const Reservations = require('../models/reservations');
const Catway = require('../models/catway');


exports.createReservation = async (req, res, next) => {
    try {
        const catwayId = req.params.id;
        const { clientName, boatName, startDate, endDate, catwayNumber } = req.body;

        console.log('Type de catway dans la req:', typeof catwayNumber);
        console.log('Type de catway.catwayNumber de database:', typeof (await Catway.findById(catwayId))?.catwayNumber);

        const catway = await Catway.findById(catwayId);
        if (!catway || catway.catwayNumber !== parseInt(catwayNumber)) {
            return res.status(400).json('Le numero du catway ne correspond pas');
        }

        const reservationData = {
            catwayNumber: parseInt(catwayNumber),
            clientName,
            boatName,
            startDate,
            endDate
        };

        const reservation = await Reservations.create(reservationData);
        return res.status(201).json(reservation);

    } catch (error) {
        console.error('Erreur dans la creation de la reservation:', error);
        return res.status(500).json(error);
    }
};


exports.getAllReservationsByCatway = async (req, res) => {
    const catwayId = req.params.id;
    
    try {
            const catway = await Catway.findById(catwayId);
            if(!catway) {
                return res.status(404).json('catway_not_found');
            }
            
            const catwayNumber = catway.catwayNumber;

            const reservations = await Reservations.find({ catwayNumber : catwayNumber });
            res.json(reservations);
    } catch (error) {
            console.error('Erreur dans la recherche des infos:', error);
            res.status(500).json(error);
    }
};

exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservations.findOne({
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

exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservations.deleteOne({
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


exports.getCurrentReservations = async (now) => {
    try {
        const reservations = await Reservations.find({
            endDate: { $gte: now } // Récupère les réservations dont la date de fin est >= à la date actuelle
        }).sort({ startDate: 1 }); // Optionnel : trier par date de début
        return reservations;
    } catch (error) {
        console.error('Erreur lors de la recherche des réservations en cours:', error);
        throw error;
    }
};