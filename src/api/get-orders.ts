import type { Order } from "@/@types/order";
import { api } from "@/lib/axios";

interface GetOrdersResponse {
	orders: Order[];
	meta: {
		pageIndex: number;
		perPage: number;
		totalCount: number;
	};
}

export interface GetOrdersQuery {
	pageIndex?: number;
}

export async function getOrders({ pageIndex }: GetOrdersQuery) {
	const response = await api.get<GetOrdersResponse>("/orders", {
		params: {
			pageIndex,
		},
	});

	return response.data;
}
