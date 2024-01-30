const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: [10, 'Email must be at least 10 characaters long.']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLenght: [4, 'Password must be at least 4 characters long']
    }
});

userSchema.virtual('rePassword')
    .set(function (value) {
        if (value !== this.password) {
            return mongoose.Error('Passwords must match!')
        }
    });

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
})

const User = mongoose.model('User', userSchema);

module.exports = User;