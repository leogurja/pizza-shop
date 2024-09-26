import { getMonthCanceledOrdersAmount } from "@/api/metrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Ban } from "lucide-react";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export function MonthlyCanceledOrdersAmount() {
	const { data } = useQuery({
		queryKey: ["metrics", "month-canceled-orders-amount"],
		queryFn: getMonthCanceledOrdersAmount,
	});
	return (
		<Card>
			<CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="font-semibold text-base">
					Cancelamentos (mês)
				</CardTitle>
				<Ban className="size-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="space-y-1">
				{data ? (
					<>
						<span className="font-bold text-2xl tracking-tight">
							{data.amount.toLocaleString("pt-BR")}
						</span>
						<p className="text-muted-foreground text-xs">
							<span
								className={cn({
									"text-emerald-500 dark:text-emerald-400":
										data.diffFromLastMonth < 0,
									"text-rose-500 before:content-['+'] dark:text-rose-400":
										data.diffFromLastMonth >= 0,
								})}
							>
								{data.diffFromLastMonth}%
							</span>{" "}
							em relação ao mês passado.
						</p>
					</>
				) : (
					<MetricCardSkeleton />
				)}
			</CardContent>
		</Card>
	);
}
