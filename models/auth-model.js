var db = require('../config/db');

module.exports = exports = {};

exports.validateTokenSession = (token, cb) => {
    return db.query(`SELECT * FROM sessions WHERE token = '${token}'`, (err, results, fields) => {
        if (results.length) {
            db.query(`
                SELECT ID, email, description, first_name, last_name, tag, active, display_name 
                FROM users WHERE ID = '${results[0].user_ID}'
            `, (err, user) => {
                user = user[0];
                user.token = token;
                user.logged_in = 1;
                cb(user)
            })
        } else {
            cb({ logged_in: false })
        }
    });
}