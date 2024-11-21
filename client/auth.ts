import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { baseApi } from "./lib/api/baseApi";
// Your own logic for dealing with plaintext password strings; be careful!

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        _id: {},
        email: {},
        password: {},
        username: {},
        name: {},
      },
      authorize: async (credentials) => {
        let user = null;

        const res = await baseApi.post("/auth/login", credentials);
        const data: { user: User } = await res.data;

        user = data.user;

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.");
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async (props) => {
      const { token, user, account } = props;

      if (user) {
        token._id = user._id;
        token.username = user.username;
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        // @ts-ignore
        session.user = token;
      }

      return session;
    },
  },
});
