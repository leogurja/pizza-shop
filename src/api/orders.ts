import { api } from "@/lib/axios";

export type OrderStatus =
	| "pending"
	| "canceled"
	| "processing"
	| "delivering"
	| "delivered";

export interface Order {
	orderId: string;
	createdAt: string;
	status: OrderStatus;
	customerName: string;
	total: number;
}

export interface GetOrdersResponse {
	orders: Order[];
	meta: {
		pageIndex: number;
		perPage: number;
		totalCount: number;
	};
}

interface AdvanceOrderParams {
	orderId: string;
}

export interface GetOrderDetailsResponse {
	id: string;
	createdAt: string;
	status: OrderStatus;
	totalInCents: number;
	customer: {
		name: string;
		email: string;
		phone?: string;
	};
	orderItems: {
		id: string;
		priceInCents: number;
		quantity: number;
		product: {
			name: string;
		};
	}[];
}

interface GetOrdersQuery {
	pageIndex: number;
	orderId: string | null;
	customerName: string | null;
	status: string | null;
}

export async function approveOrder({ orderId }: AdvanceOrderParams) {
	return await api.patch<unknown>(`/order/${orderId}/approve`);
}

export async function cancelOrder({ orderId }: AdvanceOrderParams) {
	return await api.patch<unknown>(`/order/${orderId}/cancel`);
}

export async function deliverOrder({ orderId }: AdvanceOrderParams) {
	return await api.patch<unknown>(`/order/${orderId}/deliver`);
}

export async function dispatchOrder({ orderId }: AdvanceOrderParams) {
	return await api.patch<unknown>(`/order/${orderId}/dispatch`);
}

export async function getOrderDetails(orderId: string) {
	const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`);

	return response.data;
}

export async function getOrders({ status, ...rest }: GetOrdersQuery) {
	const response = await api.get<GetOrdersResponse>("/orders", {
		params: { ...rest, status: status === "all" ? null : status },
	});

	return response.data;
}
