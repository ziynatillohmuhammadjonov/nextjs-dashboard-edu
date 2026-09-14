"use server";

import { db } from "@/lib/db";
import { createUserSchema } from "@/schemas/create-user-schema";
import { FormState } from "@/types/user-type";
import z from "zod";

export default async function createUser(_prev: FormState, formData: FormData): Promise<FormState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const userName = formData.get("userName");
  const role = formData.get("role");
  const bio = formData.get("bio");

  const result = createUserSchema.safeParse({
    name,
    email,
    userName,
    role,
    bio,
  });

  if (!result.success) {
    const flattenedErrors = z.flattenError(result.error);
    return {
      success: false,
      message: "Validation errors",
      errors: flattenedErrors.fieldErrors,
    };
  }

  if (typeof name !== "string" || typeof email !== "string" || typeof userName !== "string" || typeof role !== "string" || typeof bio !== "string") {
    return {
      success: false,
      message: "Unknown type",
    };
  }
  try {
    await db.query(
      `
        INSERT INTO users (name, email, user_name, role, bio)
        VALUES ($1, $2, $3, $4, $5)
    `,
      [name.trim(), email.trim(), userName.trim(), role.trim(), bio.trim()],
    );

    return {
      success: true,
      message: "User created",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Saqlashda xatolik",
    };
  }
}
