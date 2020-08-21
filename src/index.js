const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./routes');
const mongo = require('./mongodb');

mongo.connect(config.mongo.connectionString, config.mongo.options);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.listen(config.serverOptions.port, () => {
  console.log(`Server is running at: ${config.port}`);
})