import { getRestaurant } from "@/api/get-restaurant";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

export function RestaurantName() {
	const { data, isPending } = useQuery({
		queryKey: ["restaurant"],
		queryFn: getRestaurant,
		staleTime: Number.POSITIVE_INFINITY,
	});

	if (isPending) return <Skeleton className="h-4 w-40" />;

	return <>{data?.name ?? "Nome do Restaurante"}</>;
}

export function RestaurantNameSkeleton() {
	return;
}
