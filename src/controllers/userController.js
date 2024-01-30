const router = require('express').Router();

const userManager = require('../managers/userManager');
const ENV = require('../utils/constants');


router.get('/register', (req, res) => {
    res.render('users/register');
});

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', async (req, res) => {
    const userData = req.body;
    console.log(userData);
    try {
        const token = await userManager.login(userData);
        res.cookie(ENV.COOKIE_NAME, token);
        res.redirect('/')
    } catch (err) {
        res.render('users/login', { err });
        console.log(err);
    }
})

router.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        const token = await userManager.register(userData);  
        res.cookie(ENV.COOKIE_NAME, token);
        res.redirect('/');
    } catch (err) {
        res.render('users/register', {err});
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie(ENV.COOKIE_NAME);
    res.redirect('/')
})



module.exports = router;