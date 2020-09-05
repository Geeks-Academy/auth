class User {
  githubId: string;
  username: string;
  token: string;
  created: Date;
  constructor(
    githubId: string,
    username: string,
    token: string,
    created = new Date()
  ) {
    this.githubId = githubId;
    this.username = username;
    this.token = token;
    this.created = created;
  }
}

export = { User };
