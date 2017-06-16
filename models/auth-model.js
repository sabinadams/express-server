var db = require('../config/db');

module.exports = exports = {};

exports.validateTokenSession = (token, cb) => {
    db.query(`SELECT * FROM sessions WHERE token = '${token}'`, (err, results, fields) => {
        // Should also check if the user is active and update timestamp

        if (results.length) {
            db.query(`SELECT * FROM users WHERE ID = ${results[0].user_ID}`, (err, user, fields) => {
                cb({ isLoggedIn: true, user: user[0] });
            });
        } else {
            cb({ isLoggedIn: false, user: [] });
        }
    });
}

exports.getUserByToken = (token, cb) => {
    return db.query(`SELECT * FROM users WHERE token = '${token}'`, (err, results, fields) => {
        // Should also check if the user is active and update timestamp
        cb(results.length ? true : false);
    });
}