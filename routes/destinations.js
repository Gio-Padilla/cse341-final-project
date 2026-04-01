const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send('Register Destination');
});

router.put('/id', (req, res) => {
    res.send('Update Destination');
});

module.exports = router;
