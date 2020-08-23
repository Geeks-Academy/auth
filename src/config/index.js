require('dotenv').config();
const env = (process.env.NODE_ENV || 'development').trim();

const config = require(`./${env}.js`);

module.exports = config;