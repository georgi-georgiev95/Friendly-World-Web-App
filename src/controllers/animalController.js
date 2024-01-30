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

module.exports = router;