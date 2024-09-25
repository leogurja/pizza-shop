import { getProfile } from "@/api/profile";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

export function ProfileInfo() {
	const { data, error, isPending } = useQuery({
		queryKey: ["profile"],
		queryFn: getProfile,
		staleTime: Number.POSITIVE_INFINITY,
	});

	if (isPending)
		return (
			<div className="space-y-1.5">
				<Skeleton className="h-4 w-32" />
				<Skeleton className="h-3 w-24" />
			</div>
		);

	if (error) return <p>Erro: {error.message}</p>;

	return (
		<>
			<span>{data.name}</span>
			<span className="font-normal text-muted-foreground text-xs">
				{data.email}
			</span>
		</>
	);
}
