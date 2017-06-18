module.exports = exports = {};

let models = require('../models');
let crypto = require('crypto');
const config = require('../config/CONSTANTS');

exports.validateTokenSession = (token, cb) => {
    models.sessions.find({ where: { token: token }, include: { association: 'user', all: true } }).then(res => {
        cb(res ? { isLoggedIn: true, user: res.toJSON().user } : { isLoggedIn: false, user: [] });
    });
}

exports.login = (email, password, token, cb) => {
    let hash = crypto.createHash('sha512')
    if (email.length && password.length && token.length) {
        models.users.findOne({ where: { email: email } }).then(user => {
            if (user && user.active && user.password == hash.update(`${password}${user.salt}`).digest('hex').toUpperCase()) {
                models.sessions.findOne({ where: { user_ID: user.ID, token: token } }).then(session => {
                    let ret_user = {
                        ID: user.ID,
                        email: user.email,
                        description: user.description,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        tag: user.tag,
                        active: user.active,
                        exp_count: user.exp_count,
                        level: user.level,
                        display_name: user.display_name,
                        profile_pic: user.profile_pic,
                        token: token,
                        message: "",
                        logged_in: 1
                    };
                    if (session) {
                        ret_user.message = "Used existing token";
                        // Update the session timetamp and the user's timestamp
                        cb(ret_user);
                    } else {
                        ret_user.message = "New token generated";
                        // Create a new session with the provided token
                        // Update user's timestamp
                        models.sessions.create({
                            user_ID: user.ID,
                            token: token,
                            timestamp: Date.now()
                        }).then(() => { cb(ret_user); });
                    }
                })
            } else { cb({ loggedIn: false }); }
        })
    } else { cb({ loggedIn: false, message: 'Not all of the required fields were provided' }); }
}