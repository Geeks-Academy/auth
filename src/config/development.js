module.exports = {
  mongo: {
    connectionString: "mongodb://localhost:27017",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  serverOptions: {
    port: process.env.PORT || 3000,
  },
  githubOAuth: {
    clientID: process.env.GITHUB_CLIENTID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  }
}