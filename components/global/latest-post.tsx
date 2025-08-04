"use client";

import { useState } from "react";

import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/react";

export const LatestPost = () => {
	const [name, setName] = useState<string>("");

	const trpc = useTRPC();
	const queryClient = useQueryClient();

	const { data } = useSuspenseQuery(trpc.posts.getLatest.queryOptions());

	const postsQueryQey = trpc.posts.getLatest.queryKey();

	const createPost = useMutation(
		trpc.posts.create.mutationOptions({
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: postsQueryQey });
				setName("");
			},
		})
	);

	const [latestPost] = data;

	return (
		<div>
			{latestPost ? (
				<p className="truncate">Your most recent post: {latestPost.name}</p>
			) : (
				<p>you have no posts</p>
			)}

			<form
				onSubmit={(e) => {
					e.preventDefault();
					createPost.mutate({ name });
				}}
				className="flex flex-col gap-2"
			>
				<Input
					type="text"
					placeholder="Title"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Button type="submit" disabled={createPost.isPending}>
					{createPost.isPending ? "Submitting..." : "Submit"}
				</Button>
			</form>
		</div>
	);
};
