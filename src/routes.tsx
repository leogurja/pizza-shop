import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/app/dashboard";
import { NotFound } from "./pages/app/errors/not-found";
import { UnexpectedError } from "./pages/app/errors/unexpected-error";
import { AppLayout } from "./pages/app/layout";
import { Orders } from "./pages/app/orders";
import { AuthLayout } from "./pages/auth/layout";
import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";

export const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <UnexpectedError />,
		children: [
			{
				path: "/",
				element: <AppLayout />,
				errorElement: <UnexpectedError />,
				children: [
					{ path: "/", element: <Dashboard /> },
					{ path: "/orders", element: <Orders /> },
				],
			},
			{
				path: "/",
				element: <AuthLayout />,
				errorElement: <UnexpectedError />,
				children: [
					{ path: "/sign-in", element: <SignIn /> },
					{ path: "/sign-up", element: <SignUp /> },
				],
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);
