import path from "node:path";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import { StorageAdapter } from "./types";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export const localAdapter: StorageAdapter = {
  async uploadFile(file) {
    await fs.mkdir(UPLOAD_DIR, { recursive: true }); // papka yo'q bo'lsa, yaratamiz

    // Nomni o'zimiz yaratamiz, foydalanuvchi yuborgan nomga ishonmaymiz
    const key = `${crypto.randomUUID()}.${file.extension}`;
    await fs.writeFile(path.join(UPLOAD_DIR, key), file.buffer);

    return { url: `/uploads/${key}`, key };
  },

  async deleteFile(key) {
    // Fayl allaqachon yo'q bo'lsa ham dastur to'xtab qolmasin
    await fs.unlink(path.join(UPLOAD_DIR, key)).catch((error) => {
      console.log(error);
    });
  },
};
