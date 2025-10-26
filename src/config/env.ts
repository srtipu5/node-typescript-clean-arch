import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

// Define the environment schema
const envSchema = z.object({
  PORT: z.string().transform((val: string) => parseInt(val, 10)),
  MONGO_URI: z.string().min(1, { message: 'MONGO_URI is required' }),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DEBUG: z.string(),
  AI_SERVICES_URL: z.string(),
  AI_SERVICES_TIMEOUT: z.string().transform(Number),
  MICROSOFT_GRAPH_CLIENT_ID: z.string(),
  MICROSOFT_GRAPH_CLIENT_SECRET: z.string(),
  MICROSOFT_GRAPH_TENANT_ID: z.string(),
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
  PORT: env.PORT,
  MONGO_URI: env.MONGO_URI,
  NODE_ENV: env.NODE_ENV,
};
