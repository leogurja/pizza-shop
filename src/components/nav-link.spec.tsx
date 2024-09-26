import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NavLink } from "./nav-link";

describe("NavLink", () => {
	it("should highlight when it's the right page", () => {
		const wrapper = render(<NavLink to="/about">About</NavLink>, {
			wrapper: ({ children }) => (
				<MemoryRouter initialEntries={["/about"]}>{children}</MemoryRouter>
			),
		});

		expect(wrapper.getByText("About").getAttribute("aria-current")).toEqual(
			"page",
		);
	});

	it("should not highlight when it's the right page", () => {
		const wrapper = render(<NavLink to="/about">About</NavLink>, {
			wrapper: ({ children }) => (
				<MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
			),
		});

		expect(wrapper.getByText("About").getAttribute("aria-current")).toBeNull();
	});
});
