import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const postsRouter = createTRPCRouter({
	hello: publicProcedure
		.input(z.object({ text: z.string() }))
		.query(({ input }) => {
			return {
				greeting: `hello ${input.text}`,
			};
		}),

	create: publicProcedure
		.input(z.object({ name: z.string() }))
		.mutation(async ({ input, ctx }) => {
			return ctx.db.post.create({
				data: {
					name: input.name,
				},
			});
		}),

	getLatest: publicProcedure.query(async ({ ctx }) => {
		const post = await ctx.db.post.findMany({
			orderBy: { createdAt: "desc" },
		});

		return post ?? null;
	}),
});
