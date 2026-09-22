// scripts/test-s3.mjs
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const Bucket = process.env.AWS_S3_BUCKET;
const Key = `avatars/test-${Date.now()}.txt`;

console.log("1) Yuklash...");
await s3.send(new PutObjectCommand({ Bucket, Key, Body: "Salom, S3!", ContentType: "text/plain" }));
console.log("   ✅ Yuklandi:", Key);

console.log("2) Ochiq manzil orqali o'qish...");
const url = `${process.env.S3_PUBLIC_URL}/${Key}`;
const res = await fetch(url);
console.log(res.ok ? "   ✅ Ochildi:" : `   ❌ Xato ${res.status}:`, url);

console.log("3) O'chirish...");
await s3.send(new DeleteObjectCommand({ Bucket, Key }));
console.log("   ✅ O'chirildi");
