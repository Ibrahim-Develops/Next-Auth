import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface Credentials {
  username: string,
  password: string,
}

interface User {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  password: string,
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "text" }
      },

      async authorize(credentials, req) {

        const res = await fetch('https://dummyjson.com/auth/login', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password
          })
        })

        const user = await res.json()

        if (user) {
          return user as User
        }
        else {
          null
        }
      },
    })
  ],


})
