import { api } from "@/lib/axios";

export interface CreateRestaurantBody {
	restaurantName: string;
	managerName: string;
	email: string;
	phone: string;
}

export async function createRestaurant(body: CreateRestaurantBody) {
	await api.post("/restaurants", body);
}
