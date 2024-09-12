import { connectDB } from "@/lib/connectDB";
import nextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
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
        return {
          id: currentUser._id,
          name: currentUser.name,
          email: currentUser.email,
          image: currentUser.photo,
          createdAt: currentUser.createdAt,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // store social login info to DB
    async signIn({ user, account }) {
      if (account.provider === "google" || account.provider === "github") {
        try {
          const db = await connectDB();
          const userCollection = await db.collection("users");
          const userExits = await userCollection.findOne({ email: user.email });
          if (!userExits) {
            await userCollection.insertOne({
              name: user.name,
              email: user.email,
              image: user.image,
              provider: account.provider,
              createdAt: new Date(),
            });
          }
          return true; // Proceed with login
        } catch (error) {
          console.error("Error during sign in:", error);
          return false; // Deny login if there's an error
        }
      }
      return true; // Allow login for other providers
    },
  },
});
export { handler as GET, handler as POST };
