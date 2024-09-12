import { createBrowserRouter } from "react-router-dom";
import { appRoutes } from "./pages/app/routes";
import { authRoutes } from "./pages/auth/routes";

export const router = createBrowserRouter([appRoutes, authRoutes]);
