const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send('Register Booking');
});

router.put('/id', (req, res) => {
    res.send('Update Booking');
});

module.exports = router;
