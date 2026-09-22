"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { storage } from "@/lib/storage";
import { processImage } from "@/lib/storage/process-image";
import type { StoredFile } from "@/lib/storage/types";
import { createUserSchema } from "@/lib/validations/create-user-schema";

export type UpdateUserState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

export default async function updateUser(userId: string, prevState: UpdateUserState, formData: FormData): Promise<UpdateUserState> {
  const result = createUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    userName: formData.get("userName"),
    role: formData.get("role"),
    bio: formData.get("bio"),
    avatar: formData.get("avatar"),
  });

  if (!result.success) {
    return {
      success: false,
      message: "Maydonlarni tekshiring",
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  const { avatar, ...data } = result.data;

  const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
  if (!user) return { success: false, message: "Foydalanuvchi topilmadi" };

  let newAvatar: StoredFile | null = null;

  if (avatar.size > 0) {
    try {
      const image = await processImage(avatar);
      newAvatar = await storage.uploadFile(image);
    } catch (error) {
      console.error(error);
      return {
        success: false,
        errors: { avatar: ["Rasmni saqlab bo'lmadi. Boshqa rasm tanlab ko'ring."] },
      };
    }
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        ...data,
        bio: data.bio || null,
        ...(newAvatar && { avatarUrl: newAvatar.url, avatarKey: newAvatar.key }),
      },
    });
  } catch (error) {
    console.error(error);
    if (newAvatar) await storage.deleteFile(newAvatar.key).catch(() => {});
    return { success: false, message: "Saqlashda xatolik" };
  }

  if (newAvatar && user.avatarKey) {
    try {
      await storage.deleteFile(user.avatarKey);
    } catch (error) {
      console.error("Eski rasmni o'chirib bo'lmadi:", user.avatarKey, error);
    }
  }

  revalidatePath("/admin/users");
  return { success: true, message: "Foydalanuvchi yangilandi" };
}
