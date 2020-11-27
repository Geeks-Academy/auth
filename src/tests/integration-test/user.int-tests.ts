import { IUser } from "models/user/user.model";
import * as all from "express";
import { connectToMongo, disconnect } from "services/db.service";
import { mapUserToAttachedUser, UserCollection } from "models/user/user.schema"
import { UserService } from "services/user.service";

import dotenv from 'dotenv';
import path from "path";

dotenv.config({ path: path.join(__dirname,'../../../.env') });

export const users: IUser[] = [
  {
    email: 'user1@gmail.com',
    lastLoggedIn: new Date(),
    repoUrl: 'user1.github.com'
  },
  {
    email: 'user2@gmail.com',
    lastLoggedIn: new Date(),
    repoUrl: 'user2.github.com'
  },
  {
    email: 'user3@gmail.com',
    lastLoggedIn: new Date(),
    repoUrl: 'user3.github.com'
  },
  {
    email: 'user4@gmail.com',
    lastLoggedIn: new Date(),
    repoUrl: 'user4.github.com'
  },
  {
    email: 'user5@gmail.com',
    lastLoggedIn: new Date(),
    repoUrl: 'user5.github.com'
  },
]

describe('Userservice - integration test', () => {
  beforeEach(async () => {
    const mongoDBConnectionString = process.env.MONGODBURL as string;
    await connectToMongo(mongoDBConnectionString);
    await UserCollection.insertMany(users);
  })

  afterEach(async() => {
    await UserCollection.deleteMany({});
    await disconnect();
  })

  it('Call getUserData() with correct value should return specific user', async () => {
    const email = 'user1@gmail.com';
    const foundedUser = await UserService.getUserData(email);

    expect(foundedUser).toBeDefined();
    expect(foundedUser?.repoUrl).toEqual('user1.github.com');
  })

  it('Call getUserData() with incorrect value should return null', async () => {
    const email = 'xxx@gmail.com';
    const foundedUser = await UserService.getUserData(email);

    expect(foundedUser).toBeNull();
  })

  it('Call saveUserData() should create a new user', async () => {
    const newUser: IUser = {
      repoUrl: 'newrepo.github.com',
      email: 'newuser@gmail.com',
      lastLoggedIn: new Date()
    };
    const createdUser = await UserService.saveUserData(newUser);

    expect(createdUser).toBeDefined();
    expect(createdUser?.email).toEqual('newuser@gmail.com');
  })

  it('Call deleteUserData() should delete specific user', async () => {
    const email = 'user1@gmail.com';
    await UserService.deleteUserData(email);
    const userAfterDelete = await UserService.getUserData(email);

    expect(userAfterDelete).toBeNull();
  })
});