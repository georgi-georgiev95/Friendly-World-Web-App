const User = require('../models/User');
const bcrypt = require('bcrypt');

const generateToken = require('../utils/generateToken');

exports.register = async (userData) => {
    const user = await User.create(userData);
    const token = generateToken(user);
    return token;
};

exports.login = async (userData) => {
    const user = await User.findOne({ email: userData.email });

    if (!user) {
        throw new Error('Wrong username or password!');
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);

    if (!isMatch) {
        throw new Error('Wrong username or password!');
    }

    const token = generateToken(user);

    return token;
}