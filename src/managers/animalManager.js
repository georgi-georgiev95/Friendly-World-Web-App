const Animal = require('../models/Animal');

exports.create = (animalData) => Animal.create(animalData);

exports.getLastThree = () => Animal.find().sort({createdAt: -1}).limit(3);