const express = require('express'),
    router = express.Router(),
    _feedService = require('../services/feed-service');

router.get('/:timestamp/:polling', (req, res, ) => {
    _feedService.getFeedItems(req.params.timestamp, req.params.polling, req.user.ID, (items) => {
        res.send({
            status: 200,
            message: 'Successful DB connection',
            items: items
        });
    });

});


module.exports = router;