const express = require('express');
const passport = require('passport');
const config = require('./config');
const routes = require('./routes');
const mongo = require('./mongodb');
require('./config/passport');

mongo.connect(config.mongo.connectionString, config.mongo.options);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

routes(app);

app.listen(config.serverOptions.port, () => {
  console.log(`Server is running at: ${config.serverOptions.port}`);
})