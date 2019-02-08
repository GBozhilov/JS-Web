const express = require('express');
const config = require('./config/config');
const app = express();

const env = 'development';
const port = config[env].port;

require('./config/database')(config[env]);
require('./config/express')(app, config[env]);
require('./config/passport')();
require('./config/routes')(app);

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});