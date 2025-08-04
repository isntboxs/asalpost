"use client";

import { useRouter } from "next/navigation";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth/client";

export const SignUpView = () => {
	const router = useRouter();

	const form = useForm({
		validators: {
			onChange: z.object({
				name: z
					.string()
					.min(3, "Name must be at least 3 characters")
					.max(20, "Name must be at most 20 characters"),
				username: z
					.string()
					.min(3, "Username must be at least 3 characters")
					.max(20, "Username must be at most 20 characters")
					.regex(/^[a-zA-Z0-9_]+$/, {
						message:
							"Username can only contain letters, numbers, and underscores",
					}),
				email: z.string().email({
					message: "Invalid email address",
				}),
				password: z
					.string()
					.min(8)
					.max(64)
					.regex(/[A-Z]/, {
						message: "Password must contain at least one uppercase letter",
					})
					.regex(/[a-z]/, {
						message: "Password must contain at least one lowercase letter",
					})
					.regex(/[0-9]/, {
						message: "Password must contain at least one number",
					})
					.regex(/[!@#$%^&*(),.?":{}|<>]/, {
						message: "Password must contain at least one special character",
					}),
			}),
		},
		defaultValues: {
			name: "",
			username: "",
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			await signUp.email({
				name: value.name,
				username: value.username,
				email: value.email,
				password: value.password,
				fetchOptions: {
					onSuccess: () => {
						toast.success("Sign up successful");
						router.push("/sign-in");
					},
					onError: (ctx) => {
						toast.error("Sign up failed", {
							id: "sign-up-failed",
							description: ctx.error.message ?? ctx.error.statusText,
						});
					},
				},
			});
		},
	});

	return (
		<div className="w-full">
			<Card className="mx-auto mt-12 max-w-sm">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
					<CardDescription>
						Enter your details to create an account.
					</CardDescription>
				</CardHeader>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						void form.handleSubmit();
					}}
				>
					<CardContent>
						<div className="grid gap-4">
							<form.Field name="name">
								{(field) => (
									<div className="grid gap-2">
										<Label htmlFor={field.name}>Name</Label>
										<Input
											type="text"
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.setValue(e.target.value)}
										/>
										{field.state.meta.errors.map((error) => (
											<p
												key={error?.message}
												className="text-destructive text-[0.8rem] font-medium"
											>
												{error?.message}
											</p>
										))}
									</div>
								)}
							</form.Field>

							<form.Field name="username">
								{(field) => (
									<div className="grid gap-2">
										<Label htmlFor={field.name}>Username</Label>
										<Input
											type="text"
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.setValue(e.target.value)}
										/>
										{field.state.meta.errors.map((error) => (
											<p
												key={error?.message}
												className="text-destructive text-[0.8rem] font-medium"
											>
												{error?.message}
											</p>
										))}
									</div>
								)}
							</form.Field>

							<form.Field name="email">
								{(field) => (
									<div className="grid gap-2">
										<Label htmlFor={field.name}>Email</Label>
										<Input
											type="email"
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.setValue(e.target.value)}
										/>
										{field.state.meta.errors.map((error) => (
											<p
												key={error?.message}
												className="text-destructive text-[0.8rem] font-medium"
											>
												{error?.message}
											</p>
										))}
									</div>
								)}
							</form.Field>

							<form.Field name="password">
								{(field) => (
									<div className="grid gap-2">
										<Label htmlFor={field.name}>Password</Label>
										<Input
											type="password"
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.setValue(e.target.value)}
										/>
										{field.state.meta.errors.map((error) => (
											<p
												key={error?.message}
												className="text-destructive text-[0.8rem] font-medium"
											>
												{error?.message}
											</p>
										))}
									</div>
								)}
							</form.Field>

							<form.Subscribe>
								{(state) => (
									<Button
										type="submit"
										className="w-full"
										disabled={state.isSubmitting || !state.canSubmit}
									>
										{state.isSubmitting ? "Signing up..." : "Sign Up"}
									</Button>
								)}
							</form.Subscribe>
						</div>
					</CardContent>
				</form>
			</Card>
		</div>
	);
};
