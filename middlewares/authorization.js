// Routes that don't require authorization
let whitelist = [
    'route1',
    'route2',
    'route3',
    'route4'
];

module.exports = (req, res, next) => {

    // Checks to see if the requested route is a protected route
    if (whitelist.indexOf(req.url.substring(1)) == -1) {
        // Change this to do a user lookup for a valid token session based on the authorization token
        req.headers.auth == 'bearer test' ? next() : res.send({ status: 401, message: 'Not Authorized' })
    }

    // This gets fired if the route was whitelisted (doesn't require authorization)
    next();
}


// We could just check for a valid session here and not worry about whitelisted routes yet. 
// In that case we would add middleware for whitelisted routes within the route controller files themselves