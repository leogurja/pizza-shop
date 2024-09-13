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

export async function getProfile() {
	const response = await api.get<ProfileData>("/me");

	return response.data;
}
