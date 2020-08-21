const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const routes = require('./routes');
const mongo = require('./mongodb');
require('./config/passport');

console.log(config.serverOptions.port)

mongo.connect(config.mongo.connectionString, config.mongo.options);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

routes(app);

app.listen(config.serverOptions.port, () => {
  console.log(`Server is running at: ${config.serverOptions.port}`);
})