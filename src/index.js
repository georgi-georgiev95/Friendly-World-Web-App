const express = require('express');
const ENV = require('./utils/constants');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello from express!')
});

app.listen(ENV.PORT, () => console.log(`App is listening on port: ${ENV.PORT}`));