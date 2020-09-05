import { createOneDoc, findOneDoc } from "../crud__operation";

it("should insert a doc into collection", async () => {
  const mockUser = { _id: "some-user-id", name: "John" };
  await createOneDoc(mockUser);

  const insertedUser = await findOneDoc({ _id: "some-user-id" });
  expect(insertedUser).toEqual(mockUser);
});
