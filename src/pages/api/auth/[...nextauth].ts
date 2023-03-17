import NextAuth, { AuthOptions, Session, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import assert from 'node:assert';

assert(process.env.GOOGLE_CLIENT_ID);
assert(process.env.GOOGLE_CLIENT_SECRET);

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
