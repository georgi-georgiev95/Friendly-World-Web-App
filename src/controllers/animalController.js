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
});

router.get('/details/:animalId', async (req, res) => {
    const animal = await animalManager.getOne(req.params.animalId).lean();

    const isOwner = animal.owner == req.user?.id;
    const isUser = req.user?.id ? true : false;
    const hasDonated = animal.donations.some(x => x._id == req.user?.id);

    res.render('animals/details', { animal, isUser, isOwner, hasDonated });
});

router.get('/donate/:animalId', async (req, res) => {
    const userId = req.user.id;
    const animalId = req.params.animalId;

    await animalManager.donate(animalId, userId);

    res.redirect(`/animals/details/${animalId}`);
}) 

module.exports = router;