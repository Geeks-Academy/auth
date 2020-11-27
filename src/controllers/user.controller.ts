import { Request, Response } from 'express';
import { ExtendedRequest } from 'models/extendedRequest';
import { GithubUser, GoogleUser, IUserAttached } from 'models/user/user.model';
import { UserService } from 'services/user.service';


const getUserByEmail = async (email: string): Promise<IUserAttached | null> => {
  return await UserService.getUserByEmail(email);
};

const getUserByRepoUrl = async (repoUrl: string): Promise<IUserAttached | null> => {
  return await UserService.getUserByRepoUrl(repoUrl);
};

const getUserById = async (id: string): Promise<IUserAttached | null> => {
  return await UserService.getUserById(id);
};

export const getUserData = async (req: ExtendedRequest, res: Response): Promise<void> => {
  if (req.currentUser?.id) {
    const user = await getUserById(req.currentUser?.id);
    res.send(user);
  }

  res.status(401).send('User does not exist!');
};

export const mergeUser = async (req: ExtendedRequest, res: Response) => {
  await UserService.saveUserData({
    email: req.currentUser?.email, 
    lastLoggedIn: new Date(), 
    repoUrl: req.currentUser?.repoUrl
  });
};

export const loginUserViaGoogle = async (verifiedUser: GoogleUser, req: ExtendedRequest, res: Response): Promise<void> => {

  if (!verifiedUser) res.status(401).send('User does not exist!');

  const user = await getUserByEmail(verifiedUser.emails[0].value);

  if (!user) {
    const savedUser = await UserService.saveUserData({email: verifiedUser.emails[0].value, lastLoggedIn: new Date()});
    req.currentUser = savedUser;
    res.send(savedUser);
  } 

  req.currentUser = user;
  res.send(user)
};

export const loginUserViaGithub = async (verifiedUser: GithubUser, req: ExtendedRequest, res: Response): Promise<void> => {
  if (!verifiedUser) res.status(401).send('User does not exist!');

  const userEmail = verifiedUser._json.email;
  let user: IUserAttached | null = null;

  if (userEmail){ 
    user = await getUserByEmail(userEmail);
    req.currentUser = user;
    res.sendStatus(303).send("User exist already in database - would you like to merge user data?");
  }
  if (!user) user = await getUserByRepoUrl(verifiedUser.profileUrl);
  if (!user) {
    const savedUser = await UserService.saveUserData({repoUrl: verifiedUser.profileUrl, lastLoggedIn: new Date()});
    req.currentUser = savedUser;
    res.send(savedUser);
  } 

  req.currentUser = user;
  res.send(user)
};