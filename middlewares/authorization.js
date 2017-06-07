// Routes that don't require authorization
let whitelist = [
    '/',
    '/route2',
    '/route3',
    '/route4'
];
var _authModel = require('../models/auth-model');

module.exports = (req, res, next) => {

    if (req.method == 'OPTIONS') {
        return res.status(200).send({ message: 'Preflight check successful' });
    }

    // Checks to see if the requested route is a protected route
    if (whitelist.indexOf(req.url) == -1) {

        try {
            let token = req.headers.auth.split('bearer ')[1];
            _authModel.validateTokenSession(token, (session) => {
                session.logged_in ? next() : res.send({ status: 401, message: 'Not Authorized' });
            })
        } catch (err) {
            return res.status(200).send({ status: 401, message: 'Not Authorized' });
        }

    } else {
        // This gets fired if the route was whitelisted (doesn't require authorization)
        next();
    }

}

// We could just check for a valid session here and not worry about whitelisted routes yet. 
// In that case we would add middleware for whitelisted routes within the route controller files themselves