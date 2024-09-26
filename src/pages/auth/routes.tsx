import { UnexpectedError } from "../app/errors/unexpected-error";
import { AuthLayout } from "./layout";
import { SignIn } from "./sign-in";
import { SignUp } from "./sign-up";

export const authRoutes = {
	path: "/",
	element: <AuthLayout />,
	errorElement: <UnexpectedError />,
	children: [
		{ path: "/sign-in", element: <SignIn /> },
		{ path: "/sign-up", element: <SignUp /> },
	],
};
