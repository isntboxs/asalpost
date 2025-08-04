"use client";

import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

import { ErrorState } from "@/components/global/error-state";

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
	return (
		<ReactErrorBoundary
			fallbackRender={({ error, resetErrorBoundary }) => (
				<ErrorState
					error={error}
					resetErrorBoundaryAction={resetErrorBoundary}
				/>
			)}
		>
			{children}
		</ReactErrorBoundary>
	);
}
