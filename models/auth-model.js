var db = require('../config/db');

module.exports = exports = {};

exports.validateTokenSession = (token, cb) => {
    return db.query(`SELECT * FROM sessions WHERE token = '${token}'`, (err, results, fields) => {
        // Should also check if the user is active and update timestamp
        cb(results.length ? true : false);
    });
}