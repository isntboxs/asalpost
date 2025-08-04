"use client";

import { AppWrapper } from "@/components/global/app-wrapper";
import { ErrorState } from "@/components/global/error-state";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<AppWrapper>
			<ErrorState
				error={error}
				resetAction={() => {
					reset();
				}}
			/>
		</AppWrapper>
	);
}
