import { getMonthOrdersAmount } from "@/api/metrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";

export function MonthlyOrdersAmount() {
	const { data } = useQuery({
		queryKey: ["metrics", "month-orders-amount"],
		queryFn: getMonthOrdersAmount,
	});

	return (
		<Card>
			<CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="font-semibold text-base">Pedidos (mês)</CardTitle>
				<Utensils className="size-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="space-y-1">
				{data && (
					<>
						<span className="font-bold text-2xl tracking-tight">
							{data.amount.toLocaleString("pt-BR")}
						</span>
						<p className="text-muted-foreground text-xs">
							<span
								className={cn({
									"text-rose-500 before:content-['-'] dark:text-rose-400":
										data.diffFromLastMonth < 0,
									"text-emerald-500 before:content-['+'] dark:text-emerald-400":
										data.diffFromLastMonth >= 0,
								})}
							>
								{data.diffFromLastMonth.toLocaleString("pt-BR")}%
							</span>{" "}
							em relação ao mês passado.
						</p>
					</>
				)}
			</CardContent>
		</Card>
	);
}
