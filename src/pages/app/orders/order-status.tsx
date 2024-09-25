import type { OrderStatus as OrderStatusType } from "@/api/orders";
import { cn } from "@/lib/utils";

const orderStatusMap: Record<OrderStatusType, string> = {
	pending: "Pendente",
	canceled: "Cancelado",
	delivered: "Entregue",
	delivering: "Em entrega",
	processing: "Em preparo",
};

interface OrderStatusProps {
	status: OrderStatusType;
}

export function OrderStatus({ status }: OrderStatusProps) {
	return (
		<div className="flex items-center gap-2">
			<span
				className={cn("h-2 w-2 rounded-full", {
					"bg-slate-400": status === "pending",
					"bg-rose-400": status === "canceled",
					"bg-emerald-500": status === "delivered",
					"bg-amber-400": ["delivering", "processing"].includes(status),
				})}
			/>
			<span className="font-medium text-muted-foreground">
				{orderStatusMap[status]}
			</span>
		</div>
	);
}
