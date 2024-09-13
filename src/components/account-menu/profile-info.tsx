import { getProfile } from "@/api/get-profile";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

export function ProfileInfo() {
	const { data } = useSuspenseQuery({
		queryKey: ["profile"],
		queryFn: getProfile,
		staleTime: Number.POSITIVE_INFINITY,
	});

	return (
		<>
			<span>{data.name}</span>
			<span className="font-normal text-muted-foreground text-xs">
				{data.email}
			</span>
		</>
	);
}

export function ProfileInfoSkeleton() {
	return (
		<div className="space-y-1.5">
			<Skeleton className="h-4 w-32" />
			<Skeleton className="h-3 w-24" />
		</div>
	);
}
