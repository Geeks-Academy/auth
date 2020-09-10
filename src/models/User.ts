import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  githubId: string;
  username: string;
  token: string;
}

const UserSchema: Schema = new Schema({
  githubId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  token: { type: String, required: true },
});

export default mongoose.model<IUser>("User", UserSchema);
