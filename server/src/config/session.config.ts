import MongoStore from 'connect-mongo';
import { SessionOptions } from 'express-session';

const requiredEnvVars = ['SESSION_SECRET', 'MONGO_URI'] as const;
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// export const SessionConfig: SessionOptions = {
//   secret: process.env.SESSION_SECRET!,
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore?.create({
//     mongoUrl: process.env.MONGO_URI!,
//     ttl: 14 * 24 * 60 * 60, // 14 days expiration
//     touchAfter: 24 * 3600, // Only update session once per day
//     crypto: {
//       secret: process.env.SESSION_SECRET!, // Encrypt session data
//     },
//   }),
//   cookie: {
//     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production', // Enable secure cookies in production
//     sameSite: 'lax', // Protection against CSRF
//     path: '/', // Cookie is available for all paths
//     domain: process.env.COOKIE_DOMAIN, // Optional: set specific domain
//   },
//   name: 'sessionId', // Custom cookie name instead of default 'connect.sid'
//   rolling: true, // Reset expiration on every response
//   proxy: process.env.NODE_ENV === 'production', // Trust proxy in production
// };
