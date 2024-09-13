import type { RouteObject } from "react-router-dom";
import { Dashboard } from "./dashboard";
import { UnexpectedError } from "./errors/unexpectedError";
import { AppLayout } from "./layout";
import { Orders } from "./orders";

export const appRoutes: RouteObject = {
	path: "/",
	element: <AppLayout />,
	errorElement: <UnexpectedError />,
	children: [
		{ path: "/", element: <Dashboard /> },
		{ path: "/orders", element: <Orders /> },
	],
};
