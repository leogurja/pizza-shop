import { getOrderDetails } from "@/api/orders";
import {
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { OrderDetailsSkeleton } from "./order-details-skeleton";
import { OrderStatus } from "./order-status";

interface OrderDetailsProps {
	orderId: string;
	open: boolean;
}

export function OrderDetails({ orderId, open }: OrderDetailsProps) {
	const { data } = useQuery({
		queryKey: ["order", orderId],
		queryFn: () => getOrderDetails(orderId),
		enabled: open,
	});

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Pedido: {orderId}</DialogTitle>
				<DialogDescription>Detalhes do pedido</DialogDescription>
			</DialogHeader>
			{data ? (
				<div className="space-y-6">
					<Table>
						<TableBody>
							<TableRow>
								<TableCell className="text-muted-foreground">Status</TableCell>
								<TableCell className="flex justify-end">
									<OrderStatus status={data.status} />
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">Cliente</TableCell>
								<TableCell className="flex justify-end">
									{data.customer.name}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">
									Telefone
								</TableCell>
								<TableCell className="flex justify-end">
									{data.customer.phone ?? "Não informado"}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">E-mail</TableCell>
								<TableCell className="flex justify-end">
									{data.customer.email}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">
									Realizado há
								</TableCell>
								<TableCell className="flex justify-end">
									{formatDistanceToNow(data.createdAt, {
										locale: ptBR,
										addSuffix: true,
									})}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="text-right">Produto</TableHead>
								<TableHead className="text-right">Qtd.</TableHead>
								<TableHead className="text-right">Preço</TableHead>
								<TableHead className="text-right">Subtotal</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.orderItems.map((item) => {
								return (
									<TableRow key={item.id}>
										<TableCell>{item.product.name}</TableCell>
										<TableCell className="text-right">
											{item.quantity}
										</TableCell>
										<TableCell className="text-right">
											{(item.priceInCents / 100).toLocaleString("pt-BR", {
												style: "currency",
												currency: "BRL",
											})}
										</TableCell>
										<TableCell className="text-right">
											{(
												(item.priceInCents * item.quantity) /
												100
											).toLocaleString("pt-BR", {
												style: "currency",
												currency: "BRL",
											})}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
						<TableFooter>
							<TableCell colSpan={3}>Total do pedido</TableCell>
							<TableCell className="text-right font-medium">
								{(data.totalInCents / 100).toLocaleString("pt-BR", {
									style: "currency",
									currency: "BRL",
								})}
							</TableCell>
						</TableFooter>
					</Table>
				</div>
			) : (
				<OrderDetailsSkeleton />
			)}
		</DialogContent>
	);
}
