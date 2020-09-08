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

  it("Should throw validation errors", async () => {
    const user = new User();

    expect(user.validate).toThrow();
  });

  it("Should save a user", async () => {
    const user: IUser = new User({
      githubId: "Test github Id",
      username: "Test username",
      token: "Test token",
    });
    const spy = jest.spyOn(user, "save");

    await user.save();

    expect(spy).toHaveBeenCalled();

    expect(user).toMatchObject({
      githubId: expect.any(String),
      username: expect.any(String),
      token: expect.any(String),
    });

    expect(user.token).toBe("Test token");
  });
});
