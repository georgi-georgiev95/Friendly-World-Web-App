const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const path = require('path');
const {auth } = require('./middlewares/authMiddleware');

const ENV = require('./utils/constants');
const router = require('./router');

// init
const app = express();

// setup DB
mongoose.connect(ENV.DB_URI)
    .then(() => console.log('Connected to DB...'))
    .catch((err) => console.log(err));

// body parser
app.use(express.urlencoded({ extended: false }));

// static
app.use(express.static(path.resolve(__dirname, './public')));

// setup view engine
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

// router
app.use(cookieParser());
app.use(auth);
app.use(router);

app.listen(ENV.PORT, () => console.log(`App is listening on port: ${ENV.PORT}`));