const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name must be at least 2 characters long!']
    },
    years: {
        type: Number,
        required: [true, 'Years are required!'],
        min: 1,
        max: 100
    },
    kind: {
        type: String,
        required: [true, 'Kind is required!'],
        minLength: [3, 'Kind must be at least 3 characters long!']
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        validate: {
            validator: function (value) {
                return /^(http|https):\/\//.test(value);
            },
            message: 'Photo URL must start with http:// or https://'
        }
    },
    need: {
        type: String,
        required: [true, 'Need is required!'],
        minLength: 3,
        maxLength: 20
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minLenght: 5,
        maxLenght: 15
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: 5,
        maxLenght: 50
    },
    donations: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;