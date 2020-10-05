import { IUser, IUserAttached } from "../models/user/user.model";

export interface IUserService {
  getUserData(email: string): Promise<IUserAttached | null> 
  saveUserData(user: IUser): Promise<IUserAttached | null> 
  deleteUserData(email: string): void 
}