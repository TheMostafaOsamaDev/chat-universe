import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { baseApi } from "./lib/api/baseApi";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        _id: {},
        email: {},
        username: {},
        name: {},
        avatar: {},
      },
      authorize: (credentials: any) => {
        let user = null;

        if (credentials) {
          user = credentials;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async (props) => {
      const { token, user } = props;

      if (user) {
        token._id = user._id;
        token.username = user.username;
        token.name = user.name;
        token.email = user.email;
        token.avatar = user.avatar;
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
