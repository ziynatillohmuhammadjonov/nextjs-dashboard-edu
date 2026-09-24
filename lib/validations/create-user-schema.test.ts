import { createUserSchema } from "./create-user-schema";

describe("create-user-schema", () => {
  it("should check correct values", () => {
    const avatar = new File(["fake image content"], "avatar.png", {
      type: "image/png",
    });
    const result = createUserSchema.safeParse({
      name: "Ali",
      email: "ali@gmail.com",
      userName: "@ali",
      role: "user",
      bio: "Salom dunyo salom dunyo salom dunyo salom dunyo salom dunyo salom dunyo salomd dunyo",
      avatar,
    });
    expect(result.success).toBe(true);
  });

  it("should return error with name", () => {
    const avatar = new File(["fake image content"], "avatar.png", {
      type: "image/png",
    });
    const result = createUserSchema.safeParse({
      name: "Al",
      email: "ali@gmail.com",
      userName: "@ali",
      role: "user",
      bio: "Salom dunyo salom dunyo salom dunyo salom dunyo salom dunyo salom dunyo salomd dunyo",
      avatar,
    });
    expect(result.error?.issues[0].path).toEqual(["name"]);
  });
  it("should return error with email", () => {
    const avatar = new File(["fake image content"], "avatar.png", {
      type: "image/png",
    });
    const result = createUserSchema.safeParse({
      name: "Ali",
      email: "ali",
      userName: "@ali",
      role: "user",
      bio: "Salom dunyo salom dunyo salom dunyo salom dunyo salom dunyo salom dunyo salomd dunyo",
      avatar,
    });
    expect(result.error?.issues[0].path).toEqual(["email"]);
  });
  it("should return error with userName", () => {
    const avatar = new File(["fake avatar image"], "avatar.png", {
      type: "image/png",
    });
    const result = createUserSchema.safeParse({
      name: "Ali",
      email: "ali@gmail.com",
      userName: "",
      bio: "salom dunyo salom dunyo salom dunyo salom dunyo salom dunyo salom dunyo salom dunyo salom dunyo",
      avatar,
    });

    expect(result.error?.issues[0].path).toEqual(["userName"]);
  });

  it("should return errors for all invalid fileds", () => {
    const avatar = new File(["fake avatar image"], "avatar.png", {
      type: "image/png",
    });
    const result = createUserSchema.safeParse({
      name: "Al",
      email: "al",
      userName: "",
      role: "",
      bio: "",
      avatar,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      const path = result.error.issues.map((issue) => issue.path[0]);

      expect(path).toEqual(
        expect.arrayContaining(["name", "email", "userName", "role", "bio"]),
      );
    }
  });
});
