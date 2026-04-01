const router = require('express').Router();

const usersRouter = require('./users.js');
const packagesRouter = require('./packages.js');
const bookingsRouter = require('./bookings.js');
const destinationsRouter = require('./destinations.js');

router.use('/users', usersRouter);
router.use('/packages', packagesRouter);
router.use('/bookings', bookingsRouter);
router.use('/destinations', destinationsRouter);
router.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = router;