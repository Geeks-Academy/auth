import { Request, Response } from 'express';
import { GithubUser, GoogleUser, IUserAttached } from 'models/user/user.model';
import { UserService } from 'services/user.service';


const getUserByEmail = (email: string): Promise<IUserAttached | null> => {
  return UserService.getUserData(email);
}

const getUserByRepoUrl = (repoUrl: string): Promise<IUserAttached | null> => {
  return UserService.getUserData(repoUrl);
}


export const loginUserViaGoogle = async (verifiedUser: GoogleUser, req: Request, res: Response): Promise<void> => {

  if (!verifiedUser) res.status(401).send('User does not exist!');

  const user = await getUserByEmail(verifiedUser.emails[0].value);

  if (!user) {
    const savedUser = await UserService.saveUserData({email: verifiedUser.emails[0].value, lastLoggedIn: new Date()});
    res.send(savedUser);
  } else res.send(user)

}

export const loginUserViaGithub = async (verifiedUser: GithubUser, req: Request, res: Response): Promise<void> => {

  if (!verifiedUser) res.status(401).send('User does not exist!');

  const user = await getUserByRepoUrl(verifiedUser.profileUrl);

  if (!user) {
    const savedUser = await UserService.saveUserData({repoUrl: verifiedUser.profileUrl, lastLoggedIn: new Date()});
    res.send(savedUser);
  } else res.send(user)

}