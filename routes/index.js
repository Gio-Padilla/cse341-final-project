const router = require('express').Router();

const swaggerRoutes = require('./swagger');
const destinationRoutes = require('./destinations');
const userRoutes = require('./users');
const packageRoutes = require('./packages');
const bookingRoutes = require('./bookings');

router.get('/', (req, res) => {
    res.send('Hello World');
});

// Primary api routes
router.use('/destinations', destinationRoutes);
router.use('/users', userRoutes);
router.use('/packages', packageRoutes);
router.use('/bookings', bookingRoutes);
router.use('/api-docs', swaggerRoutes);

module.exports = router;