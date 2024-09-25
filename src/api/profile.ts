import { api } from "@/lib/axios";

interface ProfileData {
	id: string;
	name: string;
	email: string;
	phone: string | null;
	role: "manager" | "customer";
	createdAt: Date;
	updatedAt: Date;
}

interface UpdateProfileBody {
	name: string;
	description: string | null;
}

export async function getProfile() {
	const response = await api.get<ProfileData>("/me");

	return response.data;
}

export async function updateProfile(body: UpdateProfileBody) {
	await api.put("/profile", body);
}
