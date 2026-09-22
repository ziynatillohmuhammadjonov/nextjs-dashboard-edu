"use server";

import { prisma } from "@/lib/prisma";
import { localAdapter } from "@/lib/storage/locale";
import { processImage } from "@/lib/storage/process-image";
import { StoredFile, UploadInput } from "@/lib/storage/types";
import { createUserSchema } from "@/lib/validations/create-user-schema";

export default async function updateUser(userId: string, formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const userName = formData.get("userName");
  const role = formData.get("role");
  const bio = formData.get("bio");
  const avatarData = formData.get("avatar");

  const result = createUserSchema.safeParse({
    name,
    email,
    userName,
    role,
    bio,
    avatar: avatarData,
  });

  if (!result.success) {
    throw new Error("Validation error");
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof userName !== "string" ||
    typeof role !== "string" ||
    typeof bio !== "string"
  ) {
    throw new Error("All columns are required");
  }
  const { avatar, ...data } = result.data;

  let newAvatar: StoredFile | null = null;

  const user = await prisma.user.findUnique({ where: { id: Number(userId) } });

  if (avatar.size > 0) {
    try {
      // const image: UploadInput = {
      //   buffer: Buffer.from(await avatar.arrayBuffer()),
      //   mimetype: avatar.type,
      //   extension: avatar.name.split(".").pop() ?? "jpg",
      // };
      if (user?.avatarKey) await localAdapter.deleteFile(user.avatarKey);
      const image = await processImage(avatar);
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
    await prisma.user.update({
      where: { id: Number(userId) },
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
