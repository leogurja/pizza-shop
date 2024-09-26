import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { SignIn } from "./sign-in";

describe("SignIn", () => {
	it("should set default email input value if email is present in search params", () => {
		const wrapper = render(<SignIn />, {
			wrapper: ({ children }) => (
				<MemoryRouter initialEntries={["/sign-in?email=johndoe@example.com"]}>
					<HelmetProvider>
						<QueryClientProvider client={queryClient}>
							<Routes>
								<Route path="/sign-in" element={children} />
							</Routes>
						</QueryClientProvider>
					</HelmetProvider>
				</MemoryRouter>
			),
		});

		expect(
			(wrapper.getByLabelText("Seu email") as HTMLInputElement).value,
		).toEqual("johndoe@example.com");
	});
});
