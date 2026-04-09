const router = require('express').Router();
const destinationsController = require('../controllers/destinations');
const { destinationValidator } = require('../utilities/validator');

// Get all destinations
router.get(
    '/',
    //#swagger.tags = ['Destinations']
    //#swagger.summary = 'Get all destinations.'
    destinationsController.getAll
);

// Get a single a destination
router.get(
    '/:destinationId',
    //#swagger.tags = ['Destinations']
    //#swagger.summary = 'Get a single a destination by destinationId.'
    destinationsController.getSingle
);

// Create a destination
router.post(
    '/',
    //#swagger.tags = ['Destinations']
    //#swagger.summary = 'Create a destination.',
    destinationValidator,
    destinationsController.addDestination
);

// Update a destination
router.put(
    '/:destinationId',
    //#swagger.tags = ['Destinations']
    //#swagger.summary = 'Update a destination by destinationId',
    destinationValidator,
    destinationsController.editDestination
);

// Delete a destination
router.delete(
    '/:destinationId',
    //#swagger.tags = ['Destinations']
    //#swagger.summary = 'Remove/delete a destination by destinationId'
    destinationsController.deleteDestination
);

module.exports = router;