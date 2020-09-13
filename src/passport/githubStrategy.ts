import { Strategy } from 'passport-github';
import { IProfile } from '../models/User.d';
import { User } from '../models/User';

const {
  GITHUB_CLIENTID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL,
} = process.env as {
  [key: string]: string;
};

const GithubStrategy = (): Strategy =>
  new Strategy(
    {
      clientID: GITHUB_CLIENTID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK_URL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: IProfile,
      done,
    ) => {
      try {
        const user = await User.findOneOrCreate(accessToken, profile);
        done(null, user);
      } catch (err) {
        console.error(`Error occured during authentication`, err);
        done(err);
      }
    },
  );

export default GithubStrategy;
