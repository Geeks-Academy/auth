import express from 'express';
import initialize from './app';
import { connect } from './connectToMongo';

const { MONGO_CONNECTION_STRING } = process.env as {
  [key: string]: string;
};

connect(MONGO_CONNECTION_STRING);

const app = express();

const port = process.env.PORT || 3000;

initialize(app).listen(port, () => {
  console.log(`Auth service is listening at port ${port}`);
});
