import express from 'express';
import { port } from './config';

import session from 'express-session';

import dotenv from 'dotenv';
import googleRoute from './routes/google.auth';
import { connectToMongo } from './services/db.service';

dotenv.config();

connectToMongo();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
}));

googleRoute(app);

app.listen(port, () => {
  console.log(`Server is running at: ${port}`);
})