import dotenv from 'dotenv';
import initialize from './app';
import { connect } from './connectToMongo';

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env as {
  [key: string]: string;
};

connect(MONGO_CONNECTION_STRING);

const port = process.env.PORT || 3000;

initialize().listen(port, () => {
  console.log(`Auth service is listening at port ${port}`);
});
