import { api } from "@/lib/axios";

export interface SignInBody {
	email: string;
}

export async function signIn(body: SignInBody) {
	await api.post("/authenticate", body);
}

export async function signOut() {
	await api.post("/sign-out");
}
