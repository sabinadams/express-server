var _authModel = require('../models/auth-model');

// Unprotected routes
let whitelist = [
    '/',
    '/route2',
    '/route3',
    '/route4'
];

module.exports = (req, res, next) => {

    // Pre-Flight OPTIONS Request
    if (req.method == 'OPTIONS') return res.send({ message: 'Preflight check successful' });

    // Checks to see if the route is a non-protected route
    if (whitelist.indexOf(req.url) != -1) return next();

    // Tries to validate a token
    try {
        // Parse the token
        let token = req.headers.auth.split('bearer ')[1];
        // Check for a session using that token 
        _authModel.validateTokenSession(token, (session) => {
            if (session.isLoggedIn) {
                req.user = session.user;
                next();
            } else {
                res.send({ status: 401, message: 'Not Authorized' });
            }
        });
    } catch (err) {
        // This assumes an error occured or no authorization header was present on the request
        return res.send({ status: 401, message: err });
    }
}

// We could just check for a valid session here and not worry about whitelisted routes yet. 
// In that case we would add middleware for whitelisted routes within the route controller files themselves