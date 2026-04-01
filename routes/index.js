const router = require('express').Router();

const swaggerRoutes = require('./swagger');
const destinationRoutes = require('./destinations');

router.get('/', (req, res) => {
    res.send('Hello World');
});

// Primary api routes
router.use('/destinations', destinationRoutes);
router.use('/api-docs', swaggerRoutes);


module.exports = router;