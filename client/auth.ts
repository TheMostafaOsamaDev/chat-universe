import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

export const auth = betterAuth({
  database: new Database("./db/database.db"),
  user: {
    fields: {
      email: "email",
      name: "name",
      avatar: "avatar",
      mongoId: "mongoId",
    },
    additionalFields: {
      mongoId: {
        type: "string",
        required: true,
      },
      username: {
        type: "string",
        required: true,
      },
    },
    deleteUser: {
      enabled: true,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
});
