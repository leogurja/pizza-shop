import { http, HttpResponse } from "msw";
import type { CreateRestaurantBody, RestaurantData } from "../restaurant";

export const createRestaurantMock = http.post<never, CreateRestaurantBody>(
	"/restaurants",
	async ({ request }) => {
		const { restaurantName } = await request.json();

		if (restaurantName === "Pizza Shop") {
			return new HttpResponse(null, {
				status: 201,
			});
		}

		return new HttpResponse(null, { status: 400 });
	},
);

export const getManagedRestaurantMock = http.get<never, never, RestaurantData>(
	"/managed-restaurant",
	() =>
		HttpResponse.json({
			id: "custom-user-id",
			name: "John Doe",
			description: "Custom restaurant description.",
			managerId: "custom-user-id",
			createdAt: new Date(),
			updatedAt: new Date(),
		}),
);

export const restaurantMocks = [createRestaurantMock, getManagedRestaurantMock];
