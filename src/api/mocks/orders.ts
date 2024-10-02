import { http, HttpResponse } from "msw";
import type {
	GetOrderDetailsResponse,
	GetOrdersResponse,
	OrderStatus,
} from "../orders";

const statuses: OrderStatus[] = [
	"pending",
	"processing",
	"delivering",
	"delivered",
	"canceled",
];

const orders: GetOrdersResponse["orders"] = Array.from({ length: 60 }).map(
	(_, i) => ({
		orderId: `order-${i + 1}`,
		customerName: `Customer ${i + 1}`,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		total: 2400,
		status: statuses[i % 5],
	}),
);

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
	"/orders",
	async ({ request }) => {
		const { searchParams } = new URL(request.url);

		const pageIndex = Number(searchParams.get("pageIndex") || "0");
		const customerName = searchParams.get("customerName");
		const orderId = searchParams.get("orderId");
		const status = searchParams.get("status");

		let filteredOrders = orders;

		if (customerName)
			filteredOrders = filteredOrders.filter((order) =>
				order.customerName.includes(customerName),
			);
		if (orderId)
			filteredOrders = filteredOrders.filter((order) =>
				order.orderId.includes(orderId),
			);
		if (status)
			filteredOrders = filteredOrders.filter(
				(order) => order.status === status,
			);

		const paginatedOrders = filteredOrders.slice(
			pageIndex * 10,
			(pageIndex + 1) * 10,
		);

		return HttpResponse.json({
			orders: paginatedOrders,
			meta: {
				pageIndex,
				perPage: 10,
				totalCount: filteredOrders.length,
			},
		});
	},
);

export const getOrderDetailsMock = http.get<
	{ orderId: string },
	never,
	GetOrderDetailsResponse
>("/orders/:orderId", ({ params }) =>
	HttpResponse.json({
		id: params.orderId,
		customer: {
			name: "John Doe",
			email: "johndoe@example.com",
			phone: "123123123",
		},
		status: "pending",
		createdAt: new Date().toISOString(),
		totalInCents: 5000,
		orderItems: [
			{
				id: "order-item-1",
				priceInCents: 1000,
				product: { name: "Pizza Pepperoni" },
				quantity: 1,
			},
			{
				id: "order-item-1",
				priceInCents: 2000,
				product: { name: "Pizza margherita" },
				quantity: 2,
			},
		],
	}),
);

export const orderMocks = [getOrdersMock, getOrderDetailsMock];
