const router = require('express').Router();

const animalManager = require('../managers/animalManager');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('animals/create')
});

router.post('/create', isAuth, async (req, res) => {
    const animalData = {
        ...req.body,
        owner: req.user.id
    };
    try {
        await animalManager.create(animalData)
        res.redirect('/');     
    } catch (err) {
        res.render('animals/create', {err})
    }
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

router.get('/donate/:animalId', isAuth, async (req, res) => {
    const userId = req.user.id;
    const animalId = req.params.animalId;

    await animalManager.donate(animalId, userId);

    res.redirect(`/animals/details/${animalId}`);
});

router.get('/edit/:animalId', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    const animal = await animalManager.getOne(animalId).lean();

    res.render('animals/edit', { animal });
});

router.post('/edit/:animalId', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    const animalData = req.body;

    await animalManager.update(animalId, animalData);

    res.redirect(`/animals/details/${animalId}`)
})

router.get('/delete/:animalId', isAuth, async (req, res) => {
    await animalManager.delete(req.params.animalId);

    res.redirect('/animals/dashboard');
});

router.get('/search', async (req, res) => {
    const animals = await animalManager.getAll().lean();

    res.render('animals/search', {animals})
})

module.exports = router;