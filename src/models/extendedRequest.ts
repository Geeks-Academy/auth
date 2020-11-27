import { Request, Response, NextFunction } from 'express';
import { IUserAttached } from './user/user.model';

export interface ExtendedRequest extends Request {
  currentUser?: IUserAttached | null;
}

export type ExtendedRequestHandler = (req: ExtendedRequest, res: Response, next: NextFunction) => Promise<void>;