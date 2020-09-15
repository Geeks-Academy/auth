import { Document, Model } from "mongoose";

interface IUser {
  id: string;
  userName: string;
  token: string;
}

interface IProfile {
  id: string;
  displayName: string;
  [key: string]: any;
}

interface IUserDoc extends Document, IUser {}

interface IUserModel extends Model<IUserDoc> {
  findOrCreate(
    arg0: { googleId: string },
    arg1: (err: any, user: any) => any
  ): void;
  findOneOrCreate(accessToken: string, profile: IProfile): Promise<IUserDoc>;
}

export { IUser, IProfile, IUserDoc, IUserModel };
