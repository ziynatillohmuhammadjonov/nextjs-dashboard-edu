"use server";

import { db } from "@/lib/db";

export async function updateUserAction(userId: string, formData: FormData) {
  console.log("✅ updateUserAction: ", userId, formData);

  await db.query(
    `
        UPDATE users
        SET name = $1, email = $2, role = $3
        WHERE id = $4
    `,
    [formData.get("name"), formData.get("email"), formData.get("role"), userId],
  );
}
