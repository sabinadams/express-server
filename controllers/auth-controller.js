const express = require('express'),
    router = express.Router(),
    _authService = require('../services/auth-service'),
    config = require('../config/CONSTANTS');
router.post('/login', (req, res, ) => {
    let data = req.body;
    _authService.login(data.email, data.password, data.token, user_data => {
        res.send({ user: user_data });
    });
});


module.exports = router;