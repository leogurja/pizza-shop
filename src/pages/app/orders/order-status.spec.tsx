import { render } from "@testing-library/react";
import { OrderStatus } from "./order-status";

describe("Order Status", () => {
	it("should display the right text when order status is pending", () => {
		const wrapper = render(<OrderStatus status="pending" />);

		expect(wrapper.getByText("Pendente")).toBeInTheDocument();
		expect(wrapper.getByTestId("badge")).toHaveClass("bg-slate-400");
	});

	it("should display the right text when order status is processing", () => {
		const wrapper = render(<OrderStatus status="processing" />);

		expect(wrapper.getByText("Em preparo")).toBeInTheDocument();
		expect(wrapper.getByTestId("badge")).toHaveClass("bg-amber-400");
	});

	it("should display the right text when order status is delivering", () => {
		const wrapper = render(<OrderStatus status="delivering" />);

		expect(wrapper.getByText("Em entrega")).toBeInTheDocument();
		expect(wrapper.getByTestId("badge")).toHaveClass("bg-amber-400");
	});

	it("should display the right text when order status is delivered", () => {
		const wrapper = render(<OrderStatus status="delivered" />);

		expect(wrapper.getByText("Entregue")).toBeInTheDocument();
		expect(wrapper.getByTestId("badge")).toHaveClass("bg-emerald-500");
	});

	it("should display the right text when order status is canceled", () => {
		const wrapper = render(<OrderStatus status="canceled" />);

		expect(wrapper.getByText("Cancelado")).toBeInTheDocument();
		expect(wrapper.getByTestId("badge")).toHaveClass("bg-rose-400");
	});
});
