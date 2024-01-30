const express = require('express');
const mongoose = require('mongoose');

const ENV = require('./utils/constants');
const router = require('./router');

// init
const app = express();

// setup DB
mongoose.connect(ENV.DB_URI)
    .then(() => console.log('Connected to DB...'))
    .catch((err) => console.log(err));

// router
app.use(router);

app.listen(ENV.PORT, () => console.log(`App is listening on port: ${ENV.PORT}`));