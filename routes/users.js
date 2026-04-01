const router = require('express').Router();
const usersController = require('../controllers/users');

// Get all users
router.get(
    '/',
    //#swagger.tags = ['Users']
    //#swagger.summary = 'Get all users.'
    usersController.getAll
);

// Get a single a user
router.get(
    '/:userId',
    //#swagger.tags = ['Users']
    //#swagger.summary = 'Get a single a user by userId.'
    usersController.getSingle
);

// Create a user
router.post(
    '/',
    //#swagger.tags = ['Users']
    //#swagger.summary = 'Create a user.'
    usersController.addUser
);

// Update a user
router.put(
    '/:userId',
    //#swagger.tags = ['Users']
    //#swagger.summary = 'Update a user by userId'
    usersController.editUser
);

// Delete a user
router.delete(
    '/:userId',
    //#swagger.tags = ['Users']
    //#swagger.summary = 'Remove/delete a user by userId'
    usersController.deleteUser
);

module.exports = router;