const router = require('express').Router();

const swaggerRoutes = require('./swagger');
const destinationRoutes = require('./destinations');
const userRoutes = require('./users');
const packageRoutes = require('./packages');
const bookingRoutes = require('./bookings');
const authenticationRoutes = require('./authentication');

const authenticate = require('../utilities/authenticate');


// Root route (shows login status)
// Uses it based off of the saved user in the server.js file
router.get('/', (req, res) => {
    if (req.user) {
        const name = req.user.name;
        res.send(`Logged in as ${name}`);
    } else {
        res.send("Logged Out");
    }
});

// Primary api routes
router.use('/destinations', authenticate.isManager, destinationRoutes);
router.use('/users', authenticate.isManager, userRoutes);
router.use('/packages', authenticate.isManager, packageRoutes);
router.use('/bookings', authenticate.isManager, bookingRoutes);
router.use('/api-docs', swaggerRoutes);

// authentication routes
router.use('/auth', authenticationRoutes);

// I thought it would be best to keep the more complicated atuff in the authentication file.
// This helps keep the index file more clean.
router.get('/login', (req, res) => {res.redirect('/auth/login')});
router.get('/logout', (req, res) => {res.redirect('/auth/logout');});


module.exports = router;