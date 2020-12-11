import { IUser } from "models/user/user.model";
import { IUserAttached } from "models/user/user.model"
import { mapUserToAttachedUser, UserCollection } from "models/user/user.schema"
import { IUserService } from "./user.service.interface";

export const UserService: IUserService = {
  getUserByEmail: async(email: string): Promise<IUserAttached | null> => {
    const foundUser = await UserCollection.findOneAndUpdate(
      { email }, 
      { lastLoggedIn: new Date() });

    return mapUserToAttachedUser(foundUser);
  },
  getUserByRepoUrl: async(repoUrl: string): Promise<IUserAttached | null> => {
    const foundUser = await UserCollection.findOneAndUpdate(
      { repoUrl }, 
      { lastLoggedIn: new Date() });

    return mapUserToAttachedUser(foundUser);
  },
  getUserById: async(id: string): Promise<IUserAttached | null> => {
    const foundUser = await UserCollection.findByIdAndUpdate(
      id, 
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