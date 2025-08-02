import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { db } from "@/server/db";

// context
export const createTRPCContext = async (opts: { headers: Headers }) => {
	return {
		db,
		...opts,
	};
};

// initialize tRPC
const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		};
	},
});

// create a server-side caller
export const createCallerFactory = t.createCallerFactory;

// router & procedure
export const createTRPCRouter = t.router;

// middleware
const timingMiddleware = t.middleware(async ({ next, path }) => {
	const start = Date.now();

	if (t._config.isDev) {
		// artificial delay in dev
		const waitMs = Math.floor(Math.random() * 400) + 100;
		await new Promise((resolve) => setTimeout(resolve, waitMs));
	}

	const result = await next();

	const end = Date.now();
	console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

	return result;
});

// base procedure
export const baseProcedure = t.procedure;

// public procedure
export const publicProcedure = baseProcedure.use(timingMiddleware);
