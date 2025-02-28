import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface Data {
  image: string,
  email: string,
  pass: string
}

const Authorization =  ({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req ) {
        const res = await fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password
          })
        })
        const result = await res.json()
      }
    })
  ],

  
})

export default NextAuth(Authorization)