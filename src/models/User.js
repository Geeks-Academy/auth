const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  id: String,
  username: String,
  tokenIssuer: String,
  token: String
});

module.exports = model('User', UserSchema);