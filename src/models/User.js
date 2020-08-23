const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  githubId: String,
  username: String,
  token: String
});

UserSchema.statics.findOneOrCreate = async function (accessToken, profile)  {
  let result = await this.findOne({ githubId: profile.id });
  
  if(!result) {
    const user = new this({
      githubId: profile.id,
      username: profile.displayName,
      token: accessToken
    });

    user.save();
    result = user;
  }

  return result;
}

module.exports = model('User', UserSchema);