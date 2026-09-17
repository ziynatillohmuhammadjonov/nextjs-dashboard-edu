declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    BETTER_AUTH_SECRET: string;
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: string;
  }
}
