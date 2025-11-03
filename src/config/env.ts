import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

// Define the environment schema
const envSchema = z.object({
  PORT: z.string().transform(Number),
  MONGO_URI: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DEBUG: z.string().optional(),

  AI_SERVICES_URL: z.string().url(),
  AI_PRICE_ESTIMATOR_SERVICE_URL: z.string().url(),

  MICROSOFT_GRAPH_CLIENT_ID: z.string(),
  MICROSOFT_GRAPH_CLIENT_SECRET: z.string(),
  MICROSOFT_GRAPH_TENANT_ID: z.string(),
  MICROSOFT_GRAPH_REDIRECT_URI: z.string().url(),
  MICROSOFT_GRAPH_AUTH_URI: z.string().url(),
  MICROSOFT_GRAPH_TOKEN_URI: z.string().url(),
  MICROSOFT_GRAPH_USER_DETAILS_URI: z.string().url(),
  FRONTEND_REDIRECT_URI: z.string().url(),

  JWT_SECRET: z.string(),
});

// Validate process.env
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment variables:');
  console.error(parsedEnv.error.flatten().fieldErrors);
  process.exit(1); // stop the app
}

const env = parsedEnv.data;

export const config = {
  PORT: env.PORT || 3000,
  MONGO_URI: env.MONGO_URI!,
  NODE_ENV: env.NODE_ENV || 'development',
  DEBUG: env.DEBUG === 'true',

  AI_SERVICES_URL: env.AI_SERVICES_URL!,
  AI_PRICE_ESTIMATOR_SERVICE_URL: env.AI_PRICE_ESTIMATOR_SERVICE_URL!,

  MICROSOFT_GRAPH_CLIENT_ID: env.MICROSOFT_GRAPH_CLIENT_ID!,
  MICROSOFT_GRAPH_CLIENT_SECRET: env.MICROSOFT_GRAPH_CLIENT_SECRET!,
  MICROSOFT_GRAPH_TENANT_ID: env.MICROSOFT_GRAPH_TENANT_ID!,
  MICROSOFT_GRAPH_REDIRECT_URI: env.MICROSOFT_GRAPH_REDIRECT_URI!,
  MICROSOFT_GRAPH_AUTH_URI: env.MICROSOFT_GRAPH_AUTH_URI!,
  MICROSOFT_GRAPH_TOKEN_URI: env.MICROSOFT_GRAPH_TOKEN_URI!,
  MICROSOFT_GRAPH_USER_DETAILS_URI: env.MICROSOFT_GRAPH_USER_DETAILS_URI!,
  FRONTEND_REDIRECT_URI: env.FRONTEND_REDIRECT_URI!,
  JWT_SECRET: env.JWT_SECRET!,
};
