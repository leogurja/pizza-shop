import { api } from "@/lib/axios";

export interface RestaurantData {
	name: string;
	id: string;
	createdAt: Date;
	updatedAt: Date;
	description: string | null;
	managerId: string | null;
}

export interface CreateRestaurantBody {
	restaurantName: string;
	managerName: string;
	email: string;
	phone: string;
}

export async function getRestaurant() {
	const response = await api.get<RestaurantData>("/managed-restaurant");

	return response.data;
}

export async function createRestaurant(body: CreateRestaurantBody) {
	await api.post("/restaurants", body);
}
