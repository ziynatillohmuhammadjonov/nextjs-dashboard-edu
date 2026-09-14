"use server";

import { db } from "@/lib/db";

export default async function deleteUser(userId: string, _formData: FormData) {
  await db.query(
    `
        DELETE FROM users WHERE id = $1
    `,
    [userId],
  );
}
