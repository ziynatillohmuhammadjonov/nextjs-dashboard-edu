"use server";

import { signIn } from "@/auth";
import { loginUserSchema } from "@/schemas/login-user-schema";
import { FormState } from "@/types/user-type";
import { AuthError } from "next-auth";
import z from "zod";

export async function loginUser(_prev: FormState, formData: FormData): Promise<FormState> {
  const username = formData.get("username");
  const password = formData.get("password");
  const result = loginUserSchema.safeParse({
    username,
    password,
  });
  if (!result.success) {
    const flattenError = z.flattenError(result.error);
    return {
      success: false,
      message: "Validation error",
      errors: flattenError.fieldErrors,
    };
  }

  try {
    return await signIn("credentials", { ...result.data, redirectTo: "/admin" });
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, message: "Foydalanuvchi nomi yoki parol noto'g'ri." };
    }
    throw error;
  }
}
