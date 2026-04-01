import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
    res.send('Register User');
});

router.put('/id', (req, res) => {
    res.send('Update User');
});


module.exports = router;  
