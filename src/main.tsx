import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { enableMSW } from "./api/mocks";
import { ThemeProvider } from "./components/theme/theme-provider";
import { queryClient } from "./lib/react-query";
import { router } from "./routes";
import "./global.css";

enableMSW().then(() =>
	createRoot(document.getElementById("root") as HTMLElement).render(
		<StrictMode>
			<ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
				<HelmetProvider>
					<Helmet titleTemplate="%s | pizza.shop" />
					<Toaster richColors closeButton />
					<QueryClientProvider client={queryClient}>
						<RouterProvider router={router} />
					</QueryClientProvider>
				</HelmetProvider>
			</ThemeProvider>
		</StrictMode>,
	),
);
