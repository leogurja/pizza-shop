import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/app/errors/not-found";
import { appRoutes } from "./pages/app/routes";
import { authRoutes } from "./pages/auth/routes";

export const router = createBrowserRouter([
	appRoutes,
	authRoutes,
	{
		path: "*",
		element: <NotFound />,
	},
]);
