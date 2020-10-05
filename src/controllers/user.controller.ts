import { Request, Response } from 'express';
import { IUserAttached } from '../models/user/user.model';
import { UserService } from '../services/user.service';

const userService = new UserService();

const getUserByEmail = (email: string): Promise<IUserAttached | null> => {
  return userService.getUserData(email);
}

export const loginUserViaGoogle = async (verifiedUser: any, req: Request, res: Response): Promise<void> => {

  if (!verifiedUser) res.status(401).send('User does not exist!');

  console.log(verifiedUser);

  const user = await getUserByEmail(verifiedUser.emails[0].value);

  if (user === null) {
    const savedUser = await userService.saveUserData({userEmail: verifiedUser.emails[0].value, lastLoggedIn: new Date()});
    res.send(savedUser);
  } else res.send(user)

}