import dotenv from 'dotenv';

dotenv.config();

export const port = 3000;
export const mongoDBConnectionString = process.env.MONGODBURL as string;
export const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};