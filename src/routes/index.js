module.exports = (app) => {
  app.use('/health', require('./health'));
}