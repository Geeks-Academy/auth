import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  githubId: string;
  username: string;
  token: string;
}

const UserSchema: Schema = new Schema({
  githubId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  token: { type: String, required: true },
});

// Export the model and return your IUser interface
export default mongoose.model<IUser>("User", UserSchema);
