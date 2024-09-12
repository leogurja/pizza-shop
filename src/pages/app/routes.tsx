import { Dashboard } from "./dashboard";
import { AppLayout } from "./layout";
import { Orders } from "./orders";

export const appRoutes = {
	path: "/",
	element: <AppLayout />,
	children: [
		{ path: "/", element: <Dashboard /> },
		{ path: "/orders", element: <Orders /> },
	],
};
