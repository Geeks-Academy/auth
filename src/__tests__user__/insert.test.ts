import mongoose from "mongoose";
import { User, IAction } from "../models/User";

describe("User model", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  });

  afterAll(async () => {
    await User.findOneAndDelete({ token: "Test Access Token" });
    await mongoose.connection.close();
  });

  it("If the githubId is not entered, I get an error", async () => {
    try {
    } catch (error) {
      expect(error).toThrow(`Path githubId is required.`);
    }
  });

  it("Should save a user", async () => {
    const user: IAction = new User({
      githubId: "Test github Id",
      username: "Test github displayName",
      token: "Test Access Token",
    });

    await user.save();

    const { githubId, username, token } = user;

    expect(githubId).toBe("Test github Id");
    expect(username).toBe("Test github displayName");
    expect(token).toBe("Test Access Token");

    expect(user).toHaveProperty("githubId");
    expect(user).toHaveProperty("username");
    expect(user).toHaveProperty("token");
  });
});
