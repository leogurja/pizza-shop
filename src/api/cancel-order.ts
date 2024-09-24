import { api } from "@/lib/axios";

export interface CancelOrderParams {
	orderId: string;
}

export async function cancelOrder({ orderId }: CancelOrderParams) {
	return await api.patch<unknown>(`/order/${orderId}/cancel`);
}
