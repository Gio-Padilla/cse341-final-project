const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send('Register Package');
});

router.put('/id', (req, res) => {
    res.send('Update Package');
});

module.exports = router;
