import { api } from "@/lib/axios";

interface RestaurantData {
	name: string;
	id: string;
	createdAt: Date | null;
	updatedAt: Date | null;
	description: string | null;
	managerId: string | null;
}

export async function getRestaurant() {
	const response = await api.get<RestaurantData>("/managed-restaurant");

	return response.data;
}
