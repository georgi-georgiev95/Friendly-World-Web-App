const express = require('express');
const ENV = require('./utils/constants');
const router = require('./router');

const app = express();

app.use(router);

app.listen(ENV.PORT, () => console.log(`App is listening on port: ${ENV.PORT}`));