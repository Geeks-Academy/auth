const mongoose = require('mongoose');

module.exports = {
  connect: (connectionString, options) => {
    mongoose.connect(connectionString, options)
      .then(
        () => console.log('Connected to MongoDB'),
        (err) => console.log('Error connecting to MongoDB', err)
      );
  }
}