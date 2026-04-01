const mongodb = require('../data/database');

const bookingsController = {};

bookingsController.registerBooking = (req, res) => {
    res.send('Register Booking');
}

bookingsController.updateBooking = (req, res) => {
    res.send('Update Booking');
}

module.exports = bookingsController;
