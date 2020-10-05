import express from 'express';
import { mongoDBConnectionString, mongoOptions, port } from './config';
import { connect } from './connectToMongo';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import googleRoute from './routes/google.auth';

dotenv.config();

connect(mongoDBConnectionString, mongoOptions);

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