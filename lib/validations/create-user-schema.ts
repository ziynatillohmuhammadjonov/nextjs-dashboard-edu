import z from "zod";

export const RoleSchema = z.enum(["admin", "user", "teacher"]);
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const createUserSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.email(),
  userName: z.string().min(4),
  role: RoleSchema,
  bio: z.string().min(50),
  avatar: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "Rasm 5 mb oshmasligi kerak.")
    .refine(
      (file) => file.size === 0 || ALLOWED_TYPES.includes(file.type),
      "Faqat png jpg webp yuklashing kerak.",
    ),
});
