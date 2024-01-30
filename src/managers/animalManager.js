const Animal = require('../models/Animal');

exports.create = (animalData) => Animal.create(animalData);

exports.getLastThree = () => Animal.find().sort({ createdAt: -1 }).limit(3);

exports.getAll = () => Animal.find();

exports.getOne = (animalId) => Animal.findById(animalId);