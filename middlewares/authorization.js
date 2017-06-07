// Routes that don't require authorization
let whitelist = [
    '/',
    '/route2',
    '/route3',
    '/route4'
];
var _authModel = require('../models/auth-model');

module.exports = (req, res, next) => {

    // Checks to see if the requested route is a protected route
    if (whitelist.indexOf(req.url) == -1) {
        let token = req.headers.auth.split('bearer ')[1];
        _authModel.validateTokenSession(token, (session) => {
            console.log(session)
            if (session.logged_in) {
                next();
            } else {
                res.send({ status: 401, message: 'Not Authorized' });
            }
        })
    }

    // This gets fired if the route was whitelisted (doesn't require authorization)
    next();
}

// We could just check for a valid session here and not worry about whitelisted routes yet. 
// In that case we would add middleware for whitelisted routes within the route controller files themselves