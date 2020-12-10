import express from 'express';


import session from 'express-session';
import cors from 'cors'
import dotenv from 'dotenv';

import googleRoute from './routes/google.auth';
import githubRoute from './routes/github.auth';

import path from 'path';

import { connectToMongo } from './services/db.service';

import rateLimit from 'express-rate-limit';
 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
 
dotenv.config({ path: path.join(__dirname,'../.env') });
const mongoDBConnectionString = process.env.MONGODBURL as string;

connectToMongo(mongoDBConnectionString);

const app = express();

app.use(limiter);
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
}));

googleRoute(app);
githubRoute(app);

app.listen(process.env.API_PORT, () => {
  console.log(`Server is running at: ${process.env.API_PORT}`);
})