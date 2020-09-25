import { Schema, model } from "mongoose";
import { IUser, IProfile, IUserDoc, IUserModel } from './User.d'

const UserSchema = new Schema({
  id: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  token: { type: String, required: true }
});

UserSchema.statics.findOneOrCreate = async function (
  accessToken: string, { id, displayName }: IProfile
): Promise<IUserDoc> {
  const collection: IUserModel = this

  const foundUser: IUserDoc | null = await collection.findOne({ id }).exec()

  if (!foundUser) {
    const newUser = await new collection({
      id,
      userName: displayName,
      token: accessToken
    }).save()
    return newUser
  }

  return foundUser
};

const User = model<IUserDoc, IUserModel>("User", UserSchema)
export { IUser, IProfile, UserSchema, User }
