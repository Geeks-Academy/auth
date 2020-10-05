import { IUser } from "../models/user/user.model";
import { IUserAttached } from "../models/user/user.model"
import { mapUserToAttachedUser, UserCollection } from "../models/user/user.schema"
import { IUserService } from "./user.service.interface";

export class UserService implements IUserService {
  public getUserData = async(email: string): Promise<IUserAttached | null> => {
    const foundUser = await UserCollection.findOneAndUpdate(
      { userEmail: email }, 
      { lastLoggedIn: new Date() });

    return mapUserToAttachedUser(foundUser);
  }

  public saveUserData = async(user: IUser): Promise<IUserAttached | null> => {
    const createdUser = await UserCollection.create(user);

    return mapUserToAttachedUser(createdUser);
  }

  public deleteUserData = async(email: string) => {
    await UserCollection.deleteOne({ userEmail: email });
  }
  
}