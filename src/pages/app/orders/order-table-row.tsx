import type { Order } from "@/@types/order";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "./order-status";

interface OrderTableRowProps {
	order: Order;
}

export function OrderTableRow({ order }: OrderTableRowProps) {
	return (
		<TableRow>
			<TableCell>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" size="xs">
							<Search className="size-3" />
							<span className="sr-only">Detalhes do pedido</span>
						</Button>
					</DialogTrigger>
					<OrderDetails />
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
				{order.total.toLocaleString("pt-BR", {
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
				<Button variant="ghost" size="xs">
					<X className="mr-2 size-3" /> Cancelar
				</Button>
			</TableCell>
		</TableRow>
	);
}
