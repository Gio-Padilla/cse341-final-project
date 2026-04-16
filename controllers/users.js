const mongodb = require('../data/database');

// Get all the users
const getAll = async (req, res) => {
    try {
        const users = await mongodb
            .getDatabase()
            .db()
            .collection('users')
            .find()
            .toArray();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving users',
            error: error.message
        });
    }
};

// Get one user
const getSingle = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await mongodb
            .getDatabase()
            .db()
            .collection('users')
            .findOne({ userId });

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving user',
            error: error.message
        });
    }
};

// Add a user
const addUser = async (req, res) => {
    try {
        const user = {
            userId: req.body.userId,
            email: req.body.email,
            name: req.body.name,
            phone: req.body.phone,
            role: req.body.role || 'user'
        };

        await mongodb
            .getDatabase()
            .db()
            .collection('users')
            .insertOne(user);

        res.status(201).json({
            message: 'User created successfully'
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'User already exists (duplicate userId or email)'
            });
        }

        res.status(500).json({
            message: 'Error creating user',
            error: error.message
        });
    }
};

// Edit a user
const editUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const updatedUser = {
            email: req.body.email,
            name: req.body.name,
            phone: req.body.phone,
            role: req.body.role
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('users')
            .updateOne({ userId }, { $set: updatedUser });

        if (response.matchedCount === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: 'Error updating user',
            error: error.message
        });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('users')
            .deleteOne({ userId });

        if (response.deletedCount === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting user',
            error: error.message
        });
    }
};

module.exports = {
    getAll,
    getSingle,
    addUser,
    editUser,
    deleteUser
};