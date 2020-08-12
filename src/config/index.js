const env = (process.env.NODE_ENV || 'development').trim();

const config = require(`./${env}.json`);

module.exports = config;