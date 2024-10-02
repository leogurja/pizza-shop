import { http, HttpResponse } from "msw";
import type { ProfileData, UpdateProfileBody } from "../profile";

export const getProfileMock = http.get<never, never, ProfileData>("/me", () =>
	HttpResponse.json({
		id: "custom-user-id",
		name: "John Doe",
		email: "johndoe@example.com",
		phone: "9432186491",
		role: "manager",
		createdAt: new Date(),
		updatedAt: new Date(),
	}),
);

export const updateProfileMock = http.put<never, UpdateProfileBody>(
	"/profile",
	async ({ request }) => {
		const { name } = await request.json();

		if (name === "John Doe") {
			return new HttpResponse(null, { status: 204 });
		}

		return new HttpResponse(null, { status: 400 });
	},
);

export const profileMocks = [getProfileMock, updateProfileMock];
