declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    BETTER_AUTH_SECRET: string;
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: string;

    // Fayl saqlash: qaysi provayder ishlatiladi
    STORAGE_PROVIDER?: "local" | "s3";

    // AWS S3 (faqat serverda, NEXT_PUBLIC_ yo'q!)
    AWS_REGION?: string;
    AWS_S3_BUCKET?: string;
    AWS_ACCESS_KEY_ID?: string;
    AWS_SECRET_ACCESS_KEY?: string;
    S3_PUBLIC_URL?: string;

    // Ixtiyoriy: S3'ga mos boshqa xizmatlar (MinIO va h.k.)
    S3_ENDPOINT?: string;
  }
}
