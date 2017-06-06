const express = require('express'),
    router = express.Router();

router.post('/', (req, res) => {
    res.send('User Default Post');
})

router.get('/', (req, res) => {
    res.send("User Default Get");
});

router.post('/user', (req, res) => {
    res.send({
        id: 1,
        name: 'Test',
        email: 'test@gmail.com'
    });
})

module.exports = router