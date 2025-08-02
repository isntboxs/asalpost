import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { LatestPost } from "@/components/global/latest-post";
import { api, HydrateClient } from "@/trpc/server";

export default async function HomePage() {
	const hello = await api.posts.hello({ text: "kotak" });
	void api.posts.getLatest.prefetch();

	return (
		<HydrateClient>
			<div className="container mx-auto space-y-4 p-4">
				<h1>{hello.greeting}</h1>
				<ErrorBoundary fallback={<div>Something went wrong</div>}>
					<Suspense fallback={<div>Loading...</div>}>
						<LatestPost />
					</Suspense>
				</ErrorBoundary>
			</div>
		</HydrateClient>
	);
}
