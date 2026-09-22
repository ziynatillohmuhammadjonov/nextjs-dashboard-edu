import sharp from "sharp";
import { UploadInput } from "./types";

export async function processImage(file: File): Promise<UploadInput> {
  const input = Buffer.from(await file.arrayBuffer());
  const buffer = await sharp(input)
    .rotate()
    .resize(400, 400, { fit: "cover" })
    .webp({ quality: 80 })
    .toBuffer();

  // Qiziqarli tajriba: hajm qanchaga kamaydi?
  console.log(
    `Hajm: ${(file.size / 1024).toFixed(0)} KB → ${(buffer.length / 1024).toFixed(0)} KB`,
  );

  return { buffer, mimetype: "image/webp", extension: "webp" };
}
