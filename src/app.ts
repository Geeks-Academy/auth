import express from 'express';
import { mongoDBConnectionString, mongoOptions, port } from './config';
import { routes } from './routes';
import { connect } from './connectToMongo';
import dotenv from 'dotenv';

dotenv.config();

connect(mongoDBConnectionString, mongoOptions);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

app.listen(port, () => {
  console.log(`Server is running at: ${port}`);
})