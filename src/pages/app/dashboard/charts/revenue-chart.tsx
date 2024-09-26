import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import colors from "tailwindcss/colors";

import { getDailyRevenueInPeriod } from "@/api/metrics";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";

export function RevenueChart() {
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: subDays(new Date(), 7),
		to: new Date(),
	});

	const { data } = useQuery({
		queryKey: ["metrics", "daily-revenue-in-period", dateRange],
		queryFn: () => getDailyRevenueInPeriod(dateRange),
	});

	const chartData = useMemo(
		() =>
			data?.map((chartItem) => ({
				date: chartItem.date,
				receipt: chartItem.receipt / 100,
			})),
		[data],
	);

	return (
		<Card className="col-span-6">
			<CardHeader className="justify-betwaeen flex-row items-center pb-8">
				<div className="space-y-1">
					<CardTitle className="font-medium text-base">
						Receita no período
					</CardTitle>
					<CardDescription>Receita diária no período</CardDescription>
				</div>

				<div className="ml-auto flex items-center gap-3">
					<Label>Período</Label>
					<DateRangePicker date={dateRange} onDateChange={setDateRange} />
				</div>
			</CardHeader>
			<CardContent>
				{chartData ? (
					<ResponsiveContainer width="100%" height={240}>
						<LineChart data={chartData} className="!text-xs">
							<XAxis
								dataKey="date"
								tickLine={false}
								axisLine={false}
								dy={16}
								stroke={colors.zinc["400"]}
							/>
							<YAxis
								stroke={colors.zinc["400"]}
								axisLine={false}
								tickLine={false}
								width={80}
								tickFormatter={(value: number) =>
									value.toLocaleString("pt-BR", {
										style: "currency",
										currency: "BRL",
									})
								}
							/>
							<CartesianGrid vertical={false} className="stroke-muted" />
							<Line
								type="linear"
								strokeWidth={2}
								dataKey="receipt"
								stroke={colors.emerald["500"]}
							/>
						</LineChart>
					</ResponsiveContainer>
				) : (
					<div className="flex h-[240px] w-full items-center justify-center">
						<Loader2 className="size-8 animate-spin text-muted-foreground" />
					</div>
				)}
			</CardContent>
		</Card>
	);
}
