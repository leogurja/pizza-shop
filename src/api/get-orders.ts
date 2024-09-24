import type { Order } from "@/@types/order";
import { api } from "@/lib/axios";

export interface GetOrdersResponse {
	orders: Order[];
	meta: {
		pageIndex: number;
		perPage: number;
		totalCount: number;
	};
}

export interface GetOrdersQuery {
	pageIndex: number;
	orderId: string | null;
	customerName: string | null;
	status: string | null;
}

export async function getOrders({ status, ...rest }: GetOrdersQuery) {
	const response = await api.get<GetOrdersResponse>("/orders", {
		params: { ...rest, status: status === "all" ? null : status },
	});

	return response.data;
}
