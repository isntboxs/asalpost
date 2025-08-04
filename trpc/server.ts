import "server-only";

import { cache } from "react";
import { headers } from "next/headers";

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";

import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { createQueryClient } from "@/trpc/query-client";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
	const heads = new Headers(await headers());
	heads.set("x-trpc-source", "rsc");

	return createTRPCContext({
		headers: heads,
	});
});

export const getQueryClient = cache(createQueryClient);

export const trpc = createTRPCOptionsProxy({
	ctx: createContext,
	router: appRouter,
	queryClient: getQueryClient,
});
