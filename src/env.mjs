import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    RESEND_API_TOKEN: z.string().min(1).startsWith("re_"),
    MAIL_VERIFIED_SENDER: z.string().email(),

    UPSTASH_REDIS_REST_URL: z.string().url(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),

    RONIN_TOKEN: z.string().min(1),
    CACHE_TOKEN: z.string().min(1),
    PERSONAL_GITHUB_TOKEN: z.string().min(1),

    NODE_ENV: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    RESEND_API_TOKEN: process.env.RESEND_API_TOKEN,
    MAIL_VERIFIED_SENDER: process.env.MAIL_VERIFIED_SENDER,

    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,

    RONIN_TOKEN: process.env.RONIN_TOKEN,
    CACHE_TOKEN: process.env.CACHE_TOKEN,
    PERSONAL_GITHUB_TOKEN: process.env.PERSONAL_GITHUB_TOKEN,

    NODE_ENV: process.env.NODE_ENV,
  },
});
