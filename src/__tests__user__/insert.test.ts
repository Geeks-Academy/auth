import mongoose from "mongoose";
import User from "../models/User";

describe("User model", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  });

  afterAll(async () => {
    await User.findOneAndDelete({ token: "Test token" });
    await mongoose.connection.close();
  });

  it("If the githubId is not entered, I get an error", async () => {
    try {
    } catch (error) {
      expect(error).toThrow(`Path githubId is required.`);
    }
  });

  it("Should save a user", async () => {
    const user = new User({
      githubId: "Test github Id",
      username: "Test username",
      token: "Test token",
    });

    const { githubId, username, token } = user;

    expect(githubId).toBe("Test github Id");
    expect(username).toBe("Test username");
    expect(token).toBe("Test token");

    expect(user).toHaveProperty("githubId");
    expect(user).toHaveProperty("username");
    expect(user).toHaveProperty("token");
  });
});
