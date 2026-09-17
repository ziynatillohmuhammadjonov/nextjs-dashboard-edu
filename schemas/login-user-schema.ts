import { z } from "zod";

export const loginUserSchema = z.object({
  username: z.string().trim().min(3, "Kamida 3 ta belgi kiriting"),
  password: z.string().min(6, "Parol kamida 6 ta belgidan iborat bo'lsin"),
});
