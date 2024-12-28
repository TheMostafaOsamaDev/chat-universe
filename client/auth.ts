import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

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
        // @ts-ignore
        token._id = user._id;
        // @ts-ignore
        token.username = user.username;
        token.name = user.name;
        token.email = user.email;
        // @ts-ignore
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
