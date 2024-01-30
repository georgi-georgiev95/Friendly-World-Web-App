const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.create = (userData) => User.create(userData);

exports.getOne = async (userData) => {
    const user = await User.find({ email: userData.email });

    if (!user) {
        throw new Error('Wrong username or password!');
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);

    if (!isMatch) {
        throw new Error('Wrong username or password!');
    }

    return user;
}