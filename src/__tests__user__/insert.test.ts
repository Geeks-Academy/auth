import mongoose from "mongoose";
import User, { IUser } from "../models/User";

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
    const user: IUser = new User({
      githubId: "Test github Id",
      username: "Test username",
      token: "Test token",
    });
    const spy = jest.spyOn(user, "save");
    const isgithubId = user.githubId;
    const isUsername = user.username;
    const istoken = user.token;

    await user.save();

    expect(spy).toHaveBeenCalled();
    expect(isgithubId).toBe("Test github Id");
    expect(isUsername).toBe("Test username");
    expect(istoken).toBe("Test token");

    expect(user).toHaveProperty("githubId");
    expect(user).toHaveProperty("username");
    expect(user).toHaveProperty("token");
  });
});
