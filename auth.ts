import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { loginUserSchema } from "./schemas/login-user-schema";
import { db } from "./lib/db";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google,
    GitHub,
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const result = loginUserSchema.safeParse(credentials);
        if (!result.success) return null;

        const { username, password } = result.data;

        const user = await db.query(
          `
            SELECT * from users WHERE user_name = $1
            `,
          [username],
        );
        if (!user.rows[0]) return null;
        const actUser = user.rows[0];
        const passwordOk = await bcrypt.compare(password, user.rows[0].password);

        if (!passwordOk) return null;

        return { id: String(actUser.id), name: actUser.name, email: actUser.email, role: actUser.role, username: actUser.user_name };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "user";
      }
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id ?? "";
      session.user.role = token.role;
      session.user.provider = token.provider;
      return session;
    },
  },
});

// node -e "console.log(require('bcryptjs').hashSync('parol123', 10))"
