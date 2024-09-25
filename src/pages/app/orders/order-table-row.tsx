import {
	type GetOrdersResponse,
	type Order,
	type OrderStatus as OrderStatusType,
	approveOrder,
	cancelOrder,
	deliverOrder,
	dispatchOrder,
} from "@/api/orders";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
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

const NEXT_STATUS: Record<OrderStatusType, OrderStatusType> = {
	pending: "processing",
	processing: "delivering",
	delivering: "delivered",
	canceled: "canceled",
	delivered: "delivered",
};

const ADVANCE_STATUS: Record<
	OrderStatusType,
	(order: { orderId: string }) => void
> = {
	pending: approveOrder,
	processing: dispatchOrder,
	delivering: deliverOrder,
	canceled: () => {},
	delivered: () => {},
};

const NEXT_STATUS_TEXT: Record<OrderStatusType, string> = {
	pending: "Aprovar",
	processing: "Entregar",
	delivering: "Finalizar Entrega",
	canceled: "",
	delivered: "delivered",
};

export function OrderTableRow({ order }: OrderTableRowProps) {
	const [isOpen, setIsOpen] = useState(false);
	const queryClient = useQueryClient();

	const updateCachedOrder = (orderId: string, status: OrderStatusType) => {
		const cachedQueries = queryClient.getQueriesData<GetOrdersResponse>({
			queryKey: ["orders"],
		});
		for (const [cachedKey, cachedData] of cachedQueries) {
			if (cachedData == null) continue;

			queryClient.setQueryData<GetOrdersResponse>(cachedKey, {
				...cachedData,
				orders: cachedData.orders.map((order) => {
					if (order.orderId !== orderId) return order;

					return { ...order, status };
				}),
			});
		}
	};

	const { mutateAsync: handleAdvanceOrder, isPending: isAdvancingOrder } =
		useMutation({
			mutationFn: async (params: { orderId: string }) =>
				ADVANCE_STATUS[order.status](params),
			onSuccess: (_, { orderId }) =>
				updateCachedOrder(orderId, NEXT_STATUS[order.status]),
		});

	const { mutateAsync: handleCancelOrder, isPending: isCancelingOrder } =
		useMutation({
			mutationFn: cancelOrder,
			onSuccess: (_, { orderId }) => updateCachedOrder(orderId, "canceled"),
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
				<Button
					variant="ghost"
					size="xs"
					onClick={() => handleAdvanceOrder(order)}
					className={cn({
						hidden: ["canceled", "delivered"].includes(order.status),
					})}
					disabled={isAdvancingOrder || isCancelingOrder}
				>
					<ArrowRight className="mr-2 size-3" />{" "}
					{NEXT_STATUS_TEXT[order.status]}
				</Button>
			</TableCell>
			<TableCell className="">
				<Button
					variant="ghost"
					size="xs"
					disabled={
						isAdvancingOrder ||
						isCancelingOrder ||
						["canceled", "delivering", "delivered"].includes(order.status)
					}
					onClick={() => handleCancelOrder(order)}
				>
					<X className="mr-2 size-3" /> Cancelar
				</Button>
			</TableCell>
		</TableRow>
	);
}
