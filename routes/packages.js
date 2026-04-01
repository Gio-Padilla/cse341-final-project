const router = require('express').Router();
const packagesController = require('../controllers/packages');

// Get all packages
router.get(
    '/',
    //#swagger.tags = ['Packages']
    //#swagger.summary = 'Get all packages.'
    packagesController.getAll
);

// Get a single a package
router.get(
    '/:packageId',
    //#swagger.tags = ['Packages']
    //#swagger.summary = 'Get a single a package by packageId.'
    packagesController.getSingle
);

// Create a package
router.post(
    '/',
    //#swagger.tags = ['Packages']
    //#swagger.summary = 'Create a package.'
    packagesController.addPackage
);

// Update a package
router.put(
    '/:packageId',
    //#swagger.tags = ['Packages']
    //#swagger.summary = 'Update a package by packageId'
    packagesController.editPackage
);

// Delete a package
router.delete(
    '/:packageId',
    //#swagger.tags = ['Packages']
    //#swagger.summary = 'Remove/delete a package by packageId'
    packagesController.deletePackage
);

module.exports = router;