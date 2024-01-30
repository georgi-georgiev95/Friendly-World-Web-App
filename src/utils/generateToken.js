const jwt = require('../lib/jwt');
const ENV = require('../utils/constants');

module.exports = async (user) => {
    const payload = {
        id: user._id,
        email: user.email
    };

    const token = await jwt.sign(payload, ENV.SECRET);

    return token;
}