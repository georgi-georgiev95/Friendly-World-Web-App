const jsonwebtoken = require('jsonwebtoken');
const { promisify } = require('util');

const jwt = {
    verify: promisify(jsonwebtoken.verify),
    sign: promisify(jsonwebtoken.sign)
};

module.exports = jwt;