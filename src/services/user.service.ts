import { IUser } from "models/user/user.model";
import { IUserAttached } from "models/user/user.model"
import { mapUserToAttachedUser, UserCollection } from "models/user/user.schema"
import { IUserService } from "./user.service.interface";

export const UserService: IUserService = {
  getUserData: async(email: string): Promise<IUserAttached | null> => {
    const foundUser = await UserCollection.findOneAndUpdate(
      { email }, 
      { lastLoggedIn: new Date() });

    return mapUserToAttachedUser(foundUser);
  },

  saveUserData: async(user: IUser): Promise<IUserAttached | null> => {
    const createdUser = await UserCollection.create(user);

    return mapUserToAttachedUser(createdUser);
  },

  deleteUserData: async(email: string): Promise<void> => {
    await UserCollection.deleteOne({ email })
  }
}