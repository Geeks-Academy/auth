import { IBaseModelAttached } from '../base-model';

export interface IUser {

  /** A user's email */
  email?: string;

  /** A date when a user was last time logged in */
  lastLoggedIn: Date;

  /** A URL to user's public repository */
  repoUrl?: string;

}

export type IUserAttached = IUser & IBaseModelAttached;

export interface GoogleUser {
  id: string;
  displayName: string;
  name: { 
    familyName: string; 
    givenName: string; 
  };
  emails: { value: string; verified: boolean }[];
  photos: {value: string}[];
  provider: string;
  _raw: string;
  _json: {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
  }
}

export interface GithubUser {
    id: string;
    displayName: string | null;
    username: string;
    profileUrl: string;
    photos: { value: string; }[];
    provider: string;
    _raw: string;
    _json: {
      login: string;
      id: number;
      node_id: string;
      avatar_url: string;
      gravatar_id: string;
      url: string;
      html_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      starred_url: string;
      subscriptions_url: string;
      organizations_url: string;
      repos_url: string;
      events_url: string;
      received_events_url: string;
      type: string;
      site_admin: boolean;
      name: null | string;
      company: null | string;
      blog: string;
      location: null | string;
      email: null | string;
      hireable: null | string;
      bio: null | string;
      twitter_username: null | string;
      public_repos: number;
      public_gists: number;
      followers: number;
      following: number;
      created_at: string;
      updated_at: string;
    }

}