import { IUser, IUserAttached } from "models/user/user.model";

export interface IUserService {
  getUserByEmail(email: string): Promise<IUserAttached | null> 
  getUserByRepoUrl(repoUrl: string): Promise<IUserAttached | null> 
  getUserById(id: string): Promise<IUserAttached | null> 
  saveUserData(user: IUser): Promise<IUserAttached | null> 
  deleteUserData(email: string): Promise<void>
}