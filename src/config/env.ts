import dotenv from 'dotenv';
// import { z } from 'zod';

dotenv.config();

// Define the environment schema
// const envSchema = z.object({
//   PORT: z.string().transform(Number),
//   MONGO_URI: z.string().url(),
//   NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
//   DEBUG: z.string().optional(),
//   AI_SERVICES_URL: z.string().url(),
//   AI_SERVICES_TIMEOUT: z.string().transform(Number),
//   MICROSOFT_GRAPH_CLIENT_ID: z.string(),
//   MICROSOFT_GRAPH_CLIENT_SECRET: z.string(),
//   MICROSOFT_GRAPH_TENANT_ID: z.string(),
//   MICROSOFT_GRAPH_REDIRECT_URI: z.string().url(),
//   JWT_SECRET: z.string(),
// });

// // Validate process.env
// const parsedEnv = envSchema.safeParse(process.env);

// if (!parsedEnv.success) {
//   console.error('Invalid environment variables:');
//   console.error(parsedEnv.error.flatten().fieldErrors);
//   process.exit(1); // stop the app
// }

// const env = parsedEnv.data;

export const config = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI!,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DEBUG: process.env.DEBUG === 'true',

  MICROSOFT_GRAPH_CLIENT_ID: process.env.MICROSOFT_GRAPH_CLIENT_ID!,
  MICROSOFT_GRAPH_CLIENT_SECRET: process.env.MICROSOFT_GRAPH_CLIENT_SECRET!,
  MICROSOFT_GRAPH_TENANT_ID: process.env.MICROSOFT_GRAPH_TENANT_ID!,
  MICROSOFT_GRAPH_REDIRECT_URI: process.env.MICROSOFT_GRAPH_REDIRECT_URI!,

  MICROSOFT_GRAPH_AUTH_URI: process.env.MICROSOFT_GRAPH_AUTH_URI!,
  MICROSOFT_GRAPH_TOKEN_URI: process.env.MICROSOFT_GRAPH_TOKEN_URI!,
  MICROSOFT_GRAPH_USER_DETAILS_URI: process.env.MICROSOFT_GRAPH_USER_DETAILS_URI!,

  JWT_SECRET: process.env.JWT_SECRET!,
  FRONTEND_URL: process.env.FRONTEND_URL!,
};
