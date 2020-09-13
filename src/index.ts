import express from 'express';
import initialize from './app';

const app = express();

const port = process.env.PORT || 3000;

initialize(app).listen(port, () => {
  console.log(`Auth service is listening at port ${port}`);
});
