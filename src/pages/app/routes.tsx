import { NotFound } from "./404";
import { Dashboard } from "./dashboard";
import { AppLayout } from "./layout";
import { Orders } from "./orders";

export const appRoutes = {
	path: "/",
	element: <AppLayout />,
	errorElement: <NotFound />,
	children: [
		{ path: "/", element: <Dashboard /> },
		{ path: "/orders", element: <Orders /> },
	],
};
