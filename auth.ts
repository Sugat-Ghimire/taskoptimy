import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error("No profile");
      }

      await prisma.user.upsert({
        where: {
          email: profile.email,
        },
        create: {
          email: profile.email,
          name: profile.name,
          imageUrl: profile.picture,
        },
        update: {
          name: profile.name,
          imageUrl: profile.picture,
        },
      });

      return true;
    },
    async session({ session }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (!dbUser) throw new Error("User not found");
      session.user.id = dbUser.id; // Adds user ID to session
      return session;
    },
  },
});
