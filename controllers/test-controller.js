const express = require('express'),
    router = express.Router();

router.post('/', (req, res) => {
    res.send('Test Default Post');
})

router.get('/', (req, res) => {
    res.send("Test Default Get");
});

router.post('/test', (req, res) => {
    res.send(req.body);
})

module.exports = router