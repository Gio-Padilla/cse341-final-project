const mongodb = require('../data/database');

const packagesController = {};

packagesController.registerPackage = (req, res) => {
    res.send('Register Package');
}

packagesController.updatePackage = (req, res) => {
    res.send('Update Package');
}

module.exports = packagesController;