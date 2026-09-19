import type { DefaultSession } from "next-auth";
import "next-auth/jwt";

// 1) Sahifalarga beriladigan sessiya tipi
declare module "next-auth" {
  interface User {
    role?: string;
    username?: string;
  }
  interface Session {
    user: {
      provider?: string; // "github" yoki "google"
      role?: string;
    } & DefaultSession["user"]; // name, email, image saqlanib qoladi
  }
}

// 2) Cookie ichidagi JWT token tipi
declare module "next-auth/jwt" {
  interface JWT {
    provider?: string;
    id?: string;
    role?: string;
    username?: string;
  }
}
