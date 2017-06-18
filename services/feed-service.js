module.exports = exports = {};
let models = require('../models');

// Need to associate likes with post, comment, and replies
exports.getFeedItems = (timestamp, polling, userID, cb) => {
    // Get posts before timestamp if timestamp is provided, otherwise start at the most recent post
    // Get posts after timestamp if polling
    models.follows.findAll({ where: { follower_ID: userID } }).then(res => {
        followsArray = res.map(item => {
            return item.followed_ID
        });
        models.timeline_feed.findAll({
            limit: 10,
            order: [
                ['timestamp', 'DESC']
            ],
            where: {
                user_ID: { in: [...followsArray, userID] },
                post_ID: 0,
                comment_ID: 0
            },
            include: [{
                association: 'likes',
                separate: true
            }, {
                association: 'user',
                attributes: ['tag', 'ID', 'profile_pic', 'display_name'],
            }, {
                association: 'comments',
                limit: 10,
                where: { comment_ID: 0 },
                order: [
                    ['timestamp', 'DESC']
                ],
                include: [{
                    association: 'likes',
                    separate: true
                }, {
                    association: 'user',
                    attributes: ['tag', 'ID', 'profile_pic', 'display_name'],
                }, {
                    association: 'replies',
                    limit: 10,
                    order: [
                        ['timestamp', 'DESC']
                    ],
                    include: [{
                        association: 'likes',
                        separate: true
                    }, {
                        association: 'user',
                        attributes: ['tag', 'ID', 'profile_pic', 'display_name']
                    }]
                }]

            }]
        }).then(res => {
            cb(res)
        });
    });

}