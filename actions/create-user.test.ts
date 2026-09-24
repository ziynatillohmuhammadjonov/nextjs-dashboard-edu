import { FormState } from "@/types/user-type";
import createUser from "./create-user";
import { prisma } from "@/lib/prisma";
import { storage } from "@/lib/storage";

jest.mock("@/lib/prisma", () => ({
  prisma: { user: { create: jest.fn() } },
}));

jest.mock("@/lib/storage", () => ({
  storage: { uploadFile: jest.fn() },
}));

jest.mock("@/lib/storage/process-image", () => ({
  processImage: jest.fn(),
}));

const mockCreate = prisma.user.create as unknown as jest.Mock;
const mockUpload = storage.uploadFile as unknown as jest.Mock;

const initialState: FormState = { success: false, message: "" };

function makeFormData(data: Record<string, string | File>) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => formData.append(key, value));
  return formData;
}

const emptyAvatar = new File([], "empty.jpg", { type: "image/jpeg" });

const validBio =
  "Men frontend dasturchiman va Next.js bilan ishlashni juda yaxshi ko'raman.";

function validUserData(overrides: Record<string, string | File> = {}) {
  return {
    name: "Ali Valiyev",
    email: "ali@mail.com",
    userName: "ali_dev",
    role: "user",
    bio: validBio,
    avatar: emptyAvatar,
    ...overrides,
  };
}

describe("createUser server action", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("to'g'ri ma'lumot bilan foydalanuvchi yaratadi", async () => {
    mockCreate.mockResolvedValue({ id: "u1" });

    const result = await createUser(
      initialState,
      makeFormData(validUserData()),
    );

    expect(result.success).toBe(true);
    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        name: "Ali Valiyev",
        email: "ali@mail.com",
        userName: "ali_dev",
        role: "user",
        bio: validBio,
        avatarUrl: null,
        avatarKey: null,
      },
    });
    expect(mockUpload).not.toHaveBeenCalled();
  });

  it("noto'g'ri email bilan bazaga murojaat qilmaydi", async () => {
    const result = await createUser(
      initialState,
      makeFormData(validUserData({ email: "notogri" })),
    );

    expect(result.success).toBe(false);
    expect(result.errors).toEqual({ email: expect.any(Array) });
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("baza xatosini ushlaydi", async () => {
    mockCreate.mockRejectedValue(new Error("DB down"));

    const result = await createUser(
      initialState,
      makeFormData(validUserData()),
    );

    expect(result.success).toBe(false);
    expect(result.message).toBe("Saqlashda xatolik");
  });
});
