import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

export const auth = betterAuth({
  database: new Database("./db/database.db"),
  user: {
    fields: {
      email: "email",
      name: "name",
      username: "username",
      avatar: "avatar",
    },
    deleteUser: {
      enabled: true,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
});
