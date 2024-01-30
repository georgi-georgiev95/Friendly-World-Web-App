const ENV = require('../utils/constants');
const jwt = require('../lib/jwt');

exports.auth = async (req, res, next) => {
    const token = req.cookies[ENV.COOKIE_NAME];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, ENV.SECRET);
            req.user = decodedToken;
            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true;
            next();
        } catch (err) {
            res.clearCookie(ENV.COOKIE_NAME);
            res.redirect('/users/login');
        }
    } else {
        next();
    }
};