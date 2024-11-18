// src/sessions/schemas/session.schema.ts
import { Schema, Document } from 'mongoose';

export interface Session extends Document {
  _id: string;
  expires: Date;
  session: string; // JSON stringified session data
}

export const SessionSchema = new Schema(
  {
    _id: String, // Session ID
    expires: Date,
    session: {
      type: String,
      required: true,
    },
  },
  { collection: 'sessions' }, // This is the default collection used by `connect-mongo`
);
