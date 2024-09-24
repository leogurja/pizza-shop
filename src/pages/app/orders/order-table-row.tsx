import type { Order } from "@/@types/order";
import { cancelOrder } from "@/api/cancel-order";
import type { GetOrdersResponse } from "@/api/get-orders";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, Search, X } from "lucide-react";
import { useState } from "react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "./order-status";

interface OrderTableRowProps {
	order: Order;
}

export function OrderTableRow({ order }: OrderTableRowProps) {
	const [isOpen, setIsOpen] = useState(false);
	const queryClient = useQueryClient();

	const { mutateAsync: handleCancelOrder } = useMutation({
		mutationFn: cancelOrder,
		onSuccess(_, { orderId }) {
			const cachedQueries = queryClient.getQueriesData<GetOrdersResponse>({
				queryKey: ["orders"],
			});
			for (const [cachedKey, cachedData] of cachedQueries) {
				if (cachedData == null) continue;

				queryClient.setQueryData<GetOrdersResponse>(cachedKey, {
					...cachedData,
					orders: cachedData.orders.map((order) => {
						if (order.orderId !== orderId) return order;

						return { ...order, status: "canceled" };
					}),
				});
			}
			queryClient;
		},
	});

	return (
		<TableRow>
			<TableCell>
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" size="xs">
							<Search className="size-3" />
							<span className="sr-only">Detalhes do pedido</span>
						</Button>
					</DialogTrigger>
					<OrderDetails orderId={order.orderId} open={isOpen} />
				</Dialog>
			</TableCell>
			<TableCell className="font-medium font-mono text-xs">
				{order.orderId}
			</TableCell>
			<TableCell className="text-muted-foreground">
				{formatDistanceToNow(order.createdAt, {
					locale: ptBR,
					addSuffix: true,
				})}
			</TableCell>
			<TableCell>
				<OrderStatus status={order.status} />
			</TableCell>
			<TableCell className="font-medium">{order.customerName}</TableCell>
			<TableCell className="font-medium">
				{(order.total / 100).toLocaleString("pt-BR", {
					style: "currency",
					currency: "BRL",
				})}
			</TableCell>
			<TableCell className="">
				<Button variant="ghost" size="xs">
					<ArrowRight className="mr-2 size-3" /> Aprovar
				</Button>
			</TableCell>
			<TableCell className="">
				<Button
					variant="ghost"
					size="xs"
					disabled={["canceled", "delivering", "delivered"].includes(
						order.status,
					)}
					onClick={() => handleCancelOrder(order)}
				>
					<X className="mr-2 size-3" /> Cancelar
				</Button>
			</TableCell>
		</TableRow>
	);
}
