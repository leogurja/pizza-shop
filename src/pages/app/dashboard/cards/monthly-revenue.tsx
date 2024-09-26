import { getMonthRevenue } from "@/api/metrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export function MonthlyRevenueCard() {
	const { data } = useQuery({
		queryKey: ["metrics", "month-revenue"],
		queryFn: getMonthRevenue,
	});

	return (
		<Card>
			<CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="font-semibold text-base">
					Receita total (mês)
				</CardTitle>
				<DollarSign className="size-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="space-y-1">
				{data ? (
					<>
						<span className="font-bold text-2xl tracking-tight">
							{(data.receipt / 100).toLocaleString("pt-BR", {
								style: "currency",
								currency: "BRL",
							})}
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
				) : (
					<MetricCardSkeleton />
				)}
			</CardContent>
		</Card>
	);
}
