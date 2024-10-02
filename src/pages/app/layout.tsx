import { Header } from "@/components/header";
import { api } from "@/lib/axios";
import { router } from "@/routes";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export function AppLayout() {
	useEffect(() => {
		const interceptor = api.interceptors.response.use(
			(r) => r,
			(error) => {
				if (isAxiosError(error) && error.response?.status === 401) {
					router.navigate("/sign-in", { replace: true });
					return;
				}

				throw error;
			},
		);

		return () => api.interceptors.response.eject(interceptor);
	}, []);

	return (
		<div className="flex min-h-screen flex-col">
			<Header />

			<div className="flex flex-1 flex-col gap-4 p-8 pt-6">
				<Outlet />
			</div>
		</div>
	);
}
