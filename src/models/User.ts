import { Schema, Document, Types, model, Model } from "mongoose";

interface IActionPattern {
  accessToken: string;
  profile: { id: string; displayName: string };
}

interface IAction extends Document, IActionPattern {
  githubId: string;
  username: string;
  token: string;
}

interface IActionModel extends Model<IAction> {
  findOneOrCreate(action: IActionPattern): Promise<IAction>;
}

const UserSchema: Schema = new Schema({
  githubId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  token: { type: String, required: true },
});

UserSchema.statics.addAction = async function (
  action: IActionPattern
): Promise<IAction> {
  let result = await this.findOne({
    githubId: action.profile.displayName,
  }).exec();

  const { accessToken } = action;
  const { displayName, id } = action.profile;

  if (!result) {
    const entry: IAction = new this({
      githubId: id,
      username: displayName,
      token: accessToken,
    });
    await entry.save();
    result = entry;
  }
  return result;
};

export const User = model<IAction, IActionModel>("User", UserSchema);
export { IActionPattern, IAction, UserSchema };
