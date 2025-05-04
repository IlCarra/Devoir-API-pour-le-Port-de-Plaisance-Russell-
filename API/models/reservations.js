const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    catwayNumber: { type: Number, required: true },
    clientName: { type: String },
    boatName: { type: String },
    startDate: { type: Date },
    endDate: { type: Date }
});

module.exports = mongoose.model('Reservation', reservationSchema);