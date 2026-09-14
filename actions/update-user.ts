"use server";

import { db } from "@/lib/db";
import { createUserSchema } from "@/schemas/create-user-schema";

export default async function updateUser(userId: string, formData: FormData) {
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
    throw new Error("Validation error");
  }

  if (typeof name !== "string" || typeof email !== "string" || typeof userName !== "string" || typeof role !== "string" || typeof bio !== "string") {
    throw new Error("All columns are required");
  }

  await db.query(
    `
        UPDATE users
        SET name = $1, email = $2, user_name = $3, role = $4, bio = $5
        WHERE id = $6
    `,
    [name.trim(), email.trim(), userName.trim(), role.trim(), bio.trim(), userId],
  );
}
