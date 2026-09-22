"use server";

import { prisma } from "@/lib/prisma";
import { localAdapter } from "@/lib/storage/locale";
import { StoredFile, UploadInput } from "@/lib/storage/types";
import { createUserSchema } from "@/lib/validations/create-user-schema";
import { FormState } from "@/types/user-type";
import z from "zod";

export default async function createUser(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const userName = formData.get("userName");
  const role = formData.get("role");
  const bio = formData.get("bio");
  const avatarDate = formData.get("avatar");

  const result = createUserSchema.safeParse({
    name,
    email,
    userName,
    role,
    bio,
    avatar: avatarDate,
  });

  if (!result.success) {
    const flattenedErrors = z.flattenError(result.error);
    return {
      success: false,
      message: "Validation errors",
      errors: flattenedErrors.fieldErrors,
    };
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof userName !== "string" ||
    typeof role !== "string" ||
    typeof bio !== "string"
  ) {
    return {
      success: false,
      message: "Unknown type",
    };
  }

  const { avatar, ...data } = result.data;

  let newAvatar: StoredFile | null = null;

  if (avatar.size > 0) {
    try {
      const image: UploadInput = {
        buffer: Buffer.from(await avatar.arrayBuffer()),
        mimetype: avatar.type,
        extension: avatar.name.split(".").pop() ?? "jpg",
      };
      newAvatar = await localAdapter.uploadFile(image);
    } catch (error) {
      console.log(error);
      return {
        success: false,
        errors: {
          avatar: ["Rasmni saqlab bo'lmadi. Boshqa rasm tanlab ko'ring."],
        },
        message: "Validation errors",
      };
    }
  }

  try {
    await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        userName: userName.trim(),
        role: role.trim(),
        bio: bio.trim() || null,
        avatarUrl: newAvatar?.url ?? null,
        avatarKey: newAvatar?.url ?? null,
      },
    });

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
