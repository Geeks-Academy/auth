import { Express } from 'express';
import * as userController from 'controllers/user.controller'

const userRoute = (app: Express) => {
  app.get('/user', userController.getUserData);
  app.post('/user/merge', userController.mergeUser);
};

export default userRoute;