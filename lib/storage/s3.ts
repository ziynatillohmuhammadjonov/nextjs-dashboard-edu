import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { StorageAdapter } from "./types";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`.env faylida ${name} topilmadi !`);
  return value;
}

const s3 = new S3Client({
  region: requireEnv("AWS_REGION"),
  credentials: {
    accessKeyId: requireEnv("AWS_ACCESS_KEY_ID"),
    secretAccessKey: requireEnv("AWS_SECRET_ACCESS_KEY"),
  },
  endpoint: process.env.S3_ENDPOINT || undefined,
  forcePathStyle: Boolean(process.env.S3_ENDPOINT),
});

const BUCKET = requireEnv("AWS_S3_BUCKET");
const PUBLIC_URL = requireEnv("S3_PUBLIC_URL");

export const s3Adapted: StorageAdapter = {
  async uploadFile(file) {
    const key = `avaters/${crypto}.${file.extension}`;
    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );
    return { url: `${PUBLIC_URL}/${key}`, key };
  },
  async deleteFile(key) {
    await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
  },
};
