import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number(),

  DATABASE_URL: z.string(),

  JWT_SECRET: z.string().min(10),

  NODE_ENV: z.enum(["development", "production", "test"]),
});

export const env = envSchema.parse(process.env);
