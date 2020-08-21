const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: String,
  token: String
});

module.exports = model('User', UserSchema);