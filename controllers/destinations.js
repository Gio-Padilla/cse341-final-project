const mongodb = require('../data/database');

// View all the destinations
const getAll = async (req, res) => {
    try {
        const destinations = await mongodb
            .getDatabase()
            .db()
            .collection('destinations')
            .find()
            .toArray();

        res.status(200).json(destinations);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving destinations',
            error: error.message
        });
    }
};

// Get a single destination
const getSingle = async (req, res) => {
    try {
        const destinationId = req.params.destinationId;

        const destination = await mongodb
            .getDatabase()
            .db()
            .collection('destinations')
            .findOne({ destinationId });

        if (!destination) {
            return res.status(404).json({
                message: 'Destination not found'
            });
        }

        res.status(200).json(destination);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving destination',
            error: error.message
        });
    }
};

// Add a destination
const addDestination = async (req, res) => {
    try {
        const destination = {
            destinationId: req.body.destinationId,
            name: req.body.name,
            country: req.body.country,
            description: req.body.description,
            pricePerDay: req.body.pricePerDay,
            popular: req.body.popular,
            imageUrl: req.body.imageUrl
        };

        await mongodb
            .getDatabase()
            .db()
            .collection('destinations')
            .insertOne(destination);

        res.status(201).json({
            message: 'Destination created successfully'
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'destinationId already exists'
            });
        }

        res.status(500).json({
            message: 'Error creating destination',
            error: error.message
        });
    }
};

// Edit a destination
const editDestination = async (req, res) => {
    try {
        const destinationId = req.params.destinationId;

        const updatedDestination = {
            destinationId: req.body.destinationId,
            name: req.body.name,
            country: req.body.country,
            description: req.body.description,
            pricePerDay: req.body.pricePerDay,
            popular: req.body.popular,
            imageUrl: req.body.imageUrl
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('destinations')
            .replaceOne({ destinationId }, updatedDestination);

        if (response.matchedCount === 0) {
            return res.status(404).json({
                message: 'Destination not found'
            });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: 'Error updating destination',
            error: error.message
        });
    }
};

// Delete a destication
const deleteDestination = async (req, res) => {
    try {
        const destinationId = req.params.destinationId;

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('destinations')
            .deleteOne({ destinationId });

        if (response.deletedCount === 0) {
            return res.status(404).json({
                message: 'Destination not found'
            });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting destination',
            error: error.message
        });
    }
};

module.exports = {
    getAll,
    getSingle,
    addDestination,
    editDestination,
    deleteDestination
};