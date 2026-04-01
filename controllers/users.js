const mongodb = require('../data/database');

const usersController = {};

usersController.registerUser = (req, res) => {
    res.send('Register User');
}

usersController.updateUser = (req, res) => {
    res.send('Update User');
}

module.exports = usersController;