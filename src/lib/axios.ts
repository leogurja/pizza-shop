import { router } from "@/routes";
import axios, { isAxiosError } from "axios";
import { env } from "../env";

export const api = axios.create({
	baseURL: env.VITE_API_URL,
	withCredentials: true,
});

api.interceptors.response.use(
	(r) => r,
	(error) => {
		if (isAxiosError(error) && error.response?.status === 401) {
			router.navigate("/sign-in", { replace: true });
		}
		return error;
	},
);

if (env.VITE_ENABLE_API_DELAY) {
	api.interceptors.request.use(async (config) => {
		await new Promise((r) => setTimeout(r, 2000));
		return config;
	});
}
