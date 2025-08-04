"use server";

import { Suspense } from "react";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { ErrorBoundary } from "@/components/global/error-boundary";
import { LatestPost } from "@/components/global/latest-post";
import { LoadingState } from "@/components/global/loading-state";
import { getQueryClient, trpc } from "@/trpc/server";

export default async function HomePage() {
	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(trpc.posts.getLatest.queryOptions());

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className="container mx-auto space-y-4 p-4">
				<Suspense fallback={<LoadingState />}>
					<ErrorBoundary>
						<LatestPost />
					</ErrorBoundary>
				</Suspense>
			</div>
		</HydrationBoundary>
	);
}
