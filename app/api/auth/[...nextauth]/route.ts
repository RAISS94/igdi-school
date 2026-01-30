import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  // CRITICAL: This tells NextAuth where your custom login page is
  pages: {
    signIn: "/qiyada/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. Basic Validation
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 2. Search for the admin in your SQLite database
        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email },
        });

        if (!admin) {
          // No user found with that email
          return null;
        }

        // 3. Securely compare the typed password with the hashed password in DB
        const isPasswordValid = await compare(
          credentials.password,
          admin.password,
        );

        if (!isPasswordValid) {
          // Password doesn't match
          return null;
        }

        // 4. Success! Return the user info to the session
        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        };
      },
    }),
  ],
  callbacks: {
    // These callbacks ensure the user ID is available in the session if you need it
    async session({ session, token }) {
      if (session.user && token.sub) {
        // session.user.id = token.sub; // Uncomment if you extend the session type
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
