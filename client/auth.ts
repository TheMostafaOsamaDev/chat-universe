import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { baseApi } from "./lib/api/baseApi";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        _id: {},
        email: {},
        password: {},
        username: {},
        name: {},
        avatar: {},
      },
      authorize: async (credentials) => {
        let user = null;

        const res = await baseApi.post("/auth/login", credentials);
        const data: { user: User } = await res.data;

        user = data.user;

        if (!user) {
          throw new Error("Invalid credentials.");
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
