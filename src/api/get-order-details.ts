import type { OrderStatus } from "@/@types/order";
import { api } from "@/lib/axios";

interface GetOrderDetailsResponse {
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

export async function getOrderDetails(orderId: string) {
	const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`);

	return response.data;
}
