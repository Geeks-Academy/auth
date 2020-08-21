const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  id: String,
  username: String,
  token: String
});

module.exports = model('User', UserSchema);