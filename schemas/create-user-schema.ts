import z from "zod";

export const RoleSchema = z.enum(["admin", "user", "teacher"]);

export const createUserSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.email(),
  userName: z.string().min(4),
  role: RoleSchema,
  bio: z.string().min(50),
});
