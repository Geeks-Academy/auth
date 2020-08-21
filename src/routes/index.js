module.exports = (app) => {
  app.use('/health', require('./health'));
  app.use('/login', require('./auth'));
}