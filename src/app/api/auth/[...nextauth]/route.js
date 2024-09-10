import { connectDB } from "@/lib/connectDB";
import nextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = nextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        // authentication logic
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error("Missing Credentials");
        }
        const db = await connectDB();

        // email validation
        const currentUser = await db.collection("users").findOne({ email });
        if (!currentUser) {
          throw new Error("Invalid Email");
        }

        // password validation
        const passwordMatched = await bcrypt.compare(
          password,
          currentUser.password
        );
        if (!passwordMatched) {
          throw new Error("Invalid Password");
        }
        // current user
        return currentUser;
      },
    }),
  ],
  callbacks: {},
  pages: {
    signIn: "/login",
  },
});
export { handler as GET, handler as POST };
