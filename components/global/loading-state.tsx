import { Loader2Icon } from "lucide-react";

export const LoadingState = () => {
	return (
		<div className="mx-auto mt-8 flex flex-col items-center gap-2">
			<Loader2Icon className="animate-spin" />
			<p className="text-muted-foreground text-sm">Loading...</p>
		</div>
	);
};
