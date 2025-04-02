import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import dbConnect from "@/lib/dbConnect";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/mongoDBAdapter";
import type { Adapter } from "next-auth/adapters";
import Profile from "@/models/Profile";

export const _nextAuthOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(client) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // Add user ID to session object
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string; // Safely attach user ID
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; // Pass user ID to session
      }
      return token;
    },
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`;
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url;
    //   // Default to dashboard for successful sign in
    //   return `${baseUrl}/dashboard`;
    // },
    async signIn({ user, account, profile }) {
      // console.log("Sign in callback:", user, account, profile);

      return true;
    },
  },
  events: {
    // Perform actions after events
    signOut: async (message) => {
      console.log("User signed out:", message);
    },
    signIn: async ({ user }) => {
      if (!user || !user.id) return;

      console.log("Sign in event:", user);

      await dbConnect();

      const userId = user.id;

      const existingProfile = await Profile.findOne({ userId });

      if (!existingProfile) {
        const newProfile = new Profile({
          userId,
          username:
            user.name?.replace(/\s+/g, "").toLowerCase() || `user${Date.now()}`,
          avatar: user.image || "/default-avatar.png",
        });

        await newProfile.save();
        console.log("Profile created:", newProfile);
      }
    },
  },
  pages: {
    signIn: "/login", // Custom sign-in page
    error: "/auth/error", // Custom error page
  },
  logger: {
    error: (code, metadata) => {
      console.error("NextAuth Error:", code, metadata);
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure you have this set
};

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, _nextAuthOptions);
}
