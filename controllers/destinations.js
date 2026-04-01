const mongodb = require('../data/database');

const destinationsController = {};

destinationsController.registerDestination = (req, res) => {
    res.send('Register Destination');
}

destinationsController.updateDestination = (req, res) => {
    res.send('Update Destination');
}

module.exports = destinationsController;