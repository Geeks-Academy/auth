const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  id: {
    type: String,
    unique: true
  },
  username: String,
  token: String
});

UserSchema.statics.findOneOrCreate = function (accessToken, profile, cb)  {
  this.findOne({ id: profile.id }, (err, result) => {
    if(!result) {
      const user = new this({
        id: profile.id,
        username: profile.displayName,
        token: accessToken
      });

      user.save();
    } else {
      cb(null, result);
    }
  })
}

module.exports = model('User', UserSchema);