import { type BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { openAPI, username } from "better-auth/plugins";

import { env } from "@/env";
import { db } from "@/server/db";

export const authConfig = {
	baseURL: env.NEXT_PUBLIC_APP_URL,
	database: prismaAdapter(db, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
	},
	plugins: [username(), openAPI(), nextCookies()],
	secret: env.BETTER_AUTH_SECRET,
	trustedOrigins: [env.NEXT_PUBLIC_APP_URL],
} satisfies BetterAuthOptions;
