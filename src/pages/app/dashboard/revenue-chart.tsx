import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import colors from "tailwindcss/colors";

import { getDailyRevenueInPeriod } from "@/api/metrics";
import { useQuery } from "@tanstack/react-query";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";

export function RevenueChart() {
	const { data } = useQuery({
		queryKey: ["metrics", "daily-revenue-in-period"],
		queryFn: getDailyRevenueInPeriod,
	});

	return (
		<Card className="col-span-6">
			<CardHeader className="justify-betwaeen flex-row items-center pb-8">
				<div className="space-y-1">
					<CardTitle className="font-medium text-base">
						Receita no período
					</CardTitle>
					<CardDescription>Receita diária no período</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={240}>
					<LineChart data={data} className="!text-xs">
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
			</CardContent>
		</Card>
	);
}
