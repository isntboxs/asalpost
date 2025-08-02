"use client";

import { useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";

export const LatestPost = () => {
	const [name, setName] = useState<string>("");

	const utils = api.useUtils();
	const { data } = useSuspenseQuery(utils.posts.getLatest.queryOptions());

	const createPost = api.posts.create.useMutation({
		onSuccess: async () => {
			await utils.posts.invalidate();
			setName("");
		},
	});

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
