import { api } from "@/lib/axios";

export interface DispatchOrderParams {
	orderId: string;
}

export async function dispatchOrder({ orderId }: DispatchOrderParams) {
	return await api.patch<unknown>(`/order/${orderId}/dispatch`);
}
