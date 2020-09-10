import { Schema, Document, Types, model, Model } from "mongoose";

interface IUser extends Document {
  _id: Types.ObjectId;
  githubId: string;
  username: string;
  token: string;
  Schema:
}

const UserSchema: Schema = new Schema({
  githubId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  token: { type: String, required: true },
});

UserSchema.statics.findOneOrCreate = async function (
  accessToken: string,
  profile: { id: string; displayName: string }
) {
  let result = await this.findOne({ githubId: profile }).exec();

  const { id, displayName } = profile;

  if (!result) {
    const user = new this({
      githubId: id,
      username: displayName,
      token: accessToken,
    });

    user.save();
    result = user;
  }

  return result;
};

// For model
export interface IUserModel extends Model<IUser> {
  token: string;
  username: string;
  githubId: string;
  findOneOrCreate(accessToken: string, profile: object): Promise<IUser>;
}

export default model<IUser>("User", UserSchema);
