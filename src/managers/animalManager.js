const Animal = require('../models/Animal');

exports.create = (animalData) => Animal.create(animalData);

exports.getLastThree = () => Animal.find().sort({ createdAt: -1 }).limit(3);

exports.getAll = () => Animal.find();

exports.getOne = (animalId) => Animal.findById(animalId).populate('donations');

exports.donate = (animalId, userId) => Animal.findByIdAndUpdate(animalId, { $push: { donations: userId } });

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);

exports.update = (animalId, animalData) => Animal.findByIdAndUpdate(animalId, animalData);