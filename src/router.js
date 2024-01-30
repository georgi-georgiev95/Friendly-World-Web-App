const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('This is home page!')
})

module.exports = router;