import { http, HttpResponse } from "msw";
import type { CreateRestaurantBody } from "../restaurant";

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
