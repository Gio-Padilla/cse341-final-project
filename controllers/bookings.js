const mongodb = require('../data/database');

// Get all bookings
const getAll = async (req, res) => {
    try {
        const bookings = await mongodb
            .getDatabase()
            .db()
            .collection('bookings')
            .find()
            .toArray();

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving bookings',
            error: error.message
        });
    }
};

// Get a booking by its Id
const getSingle = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;

        const booking = await mongodb
            .getDatabase()
            .db()
            .collection('bookings')
            .findOne({ bookingId });

        if (!booking) {
            return res.status(404).json({
                message: 'Booking not found'
            });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving booking',
            error: error.message
        });
    }
};

// Get all bookings by specified userId
const getByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;

        const bookings = await mongodb
            .getDatabase()
            .db()
            .collection('bookings')
            .find({ userId })
            .toArray();

        if (bookings.length === 0) {
            return res.status(404).json({
                message: 'No bookings found for this user'
            });
        }

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving user bookings',
            error: error.message
        });
    }
};

// Create a booking
const addBooking = async (req, res) => {
    try {
        const booking = {
            bookingId: req.body.bookingId,
            userId: req.body.userId,
            packageId: req.body.packageId,
            bookingDate: req.body.bookingDate,
            travelDate: req.body.travelDate,
            numberOfPeople: req.body.numberOfPeople,
            totalPrice: req.body.totalPrice,
            status: req.body.status || 'pending'
        };

        await mongodb
            .getDatabase()
            .db()
            .collection('bookings')
            .insertOne(booking);

        res.status(201).json({
            message: 'Booking created successfully'
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'bookingId already exists'
            });
        }

        res.status(500).json({
            message: 'Error creating booking',
            error: error.message
        });
    }
};

// Edit a booking
const editBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;

        const updatedBooking = {
            bookingId: req.body.bookingId,
            userId: req.body.userId,
            packageId: req.body.packageId,
            bookingDate: req.body.bookingDate,
            travelDate: req.body.travelDate,
            numberOfPeople: req.body.numberOfPeople,
            totalPrice: req.body.totalPrice,
            status: req.body.status
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('bookings')
            .replaceOne({ bookingId }, updatedBooking);

        if (response.matchedCount === 0) {
            return res.status(404).json({
                message: 'Booking not found'
            });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: 'Error updating booking',
            error: error.message
        });
    }
};

// Delete a booking
const deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('bookings')
            .deleteOne({ bookingId });

        if (response.deletedCount === 0) {
            return res.status(404).json({
                message: 'Booking not found'
            });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting booking',
            error: error.message
        });
    }
};

module.exports = {
    getAll,
    getSingle,
    getByUserId,
    addBooking,
    editBooking,
    deleteBooking
};