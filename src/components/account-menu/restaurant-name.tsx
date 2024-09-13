import { getRestaurant } from "@/api/get-restaurant";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

export function RestaurantName() {
	const { data } = useSuspenseQuery({
		queryKey: ["restaurant"],
		queryFn: getRestaurant,
		staleTime: Number.POSITIVE_INFINITY,
	});

	return <>{data.name}</>;
}

export function RestaurantNameSkeleton() {
	return <Skeleton className="h-4 w-40" />;
}
