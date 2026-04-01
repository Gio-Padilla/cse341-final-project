const router = require('express').Router();
const bookingsController = require('../controllers/bookings');

// Get all bookings
router.get(
    '/',
    //#swagger.tags = ['Booking']
    //#swagger.summary = 'Get all bookings.'
    bookingsController.getAll
);

// Get a single a booking
router.get(
    '/booking/:bookingId',
    //#swagger.tags = ['Booking']
    //#swagger.summary = 'Get a single a booking by bookingId.'
    bookingsController.getSingle
);

// Get a bookings based off of userId
router.get(
    '/user/:userId',
    //#swagger.tags = ['Booking']
    //#swagger.summary = 'Get a bookings based off of userId.'
    bookingsController.getByUserId
);

// Create a booking
router.post(
    '/',
    //#swagger.tags = ['Booking']
    //#swagger.summary = 'Create a booking.'
    bookingsController.addBooking
);

// Update a booking
router.put(
    '/:bookingId',
    //#swagger.tags = ['Booking']
    //#swagger.summary = 'Update a booking by bookingId'
    bookingsController.editBooking
);

// Delete a booking
router.delete(
    '/:bookingId',
    //#swagger.tags = ['Booking']
    //#swagger.summary = 'Remove/delete a booking by bookingId'
    bookingsController.deleteBooking
);

module.exports = router;