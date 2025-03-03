import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type CustomUser = User & {
  accessToken?: string;
  username?: string;
};

declare module "next-auth" {
  interface Session {
    user: CustomUser;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      
      async authorize(credentials) {
        const res = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        if (!res.ok) {
          throw new Error("Invalid credentials");
        }

        const user = await res.json();
        console.log("user", user);
        
        return { ...user, accessToken: user.accessToken, username: user.username  } as CustomUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: CustomUser; }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.username = user.username
      }
      return token;

    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.username = token.username as string
      session.user.accessToken = token.accessToken as string;
      return session;

    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
