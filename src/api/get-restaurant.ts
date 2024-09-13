import { api } from "@/lib/axios";

export interface RestaurantData {
	name: string;
	id: string;
	createdAt: Date;
	updatedAt: Date;
	description: string | null;
	managerId: string | null;
}

export async function getRestaurant() {
	const response = await api.get<RestaurantData>("/managed-restaurant");

	return response.data;
}
