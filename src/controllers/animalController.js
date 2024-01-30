const router = require('express').Router();

const animalManager = require('../managers/animalManager');

router.get('/create', (req, res) => {
    res.render('animals/create')
});

router.post('/create', async (req, res) => {
    const animalData = {
        ...req.body,
        owner: req.user.id
    };

    await animalManager.create(animalData)
    res.redirect('/');
});

router.get('/dashboard', async (req, res) => {
    const animals = await animalManager.getAll().lean();
    const noAnimals = animals.length == 0 ? true : false;
    res.render('animals/dashboard', { animals, noAnimals });
})

module.exports = router;