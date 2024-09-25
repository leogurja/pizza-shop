import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import colors from "tailwindcss/colors";

import { getPopularProducts } from "@/api/metrics";
import { useQuery } from "@tanstack/react-query";
import { BarChart } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { ProductsPieLabel } from "./products-pie-label";

const COLORS = [
	colors.sky[500],
	colors.amber[500],
	colors.emerald[500],
	colors.rose[500],
	colors.violet[500],
];

export function PopularProductsChart() {
	const { data } = useQuery({
		queryKey: ["metrics", "popular-products"],
		queryFn: getPopularProducts,
	});
	return (
		<Card className="col-span-3">
			<CardHeader className="pb-8">
				<div className="flex items-center justify-between">
					<CardTitle className="font-medium text-base">
						Produtos populares
					</CardTitle>
					<BarChart className="size-4 text-muted-foreground" />
				</div>
			</CardHeader>
			<CardContent>
				{data && (
					<ResponsiveContainer width="100%" height={240}>
						<PieChart className="!text-xs">
							<Pie
								data={data}
								dataKey="amount"
								nameKey="product"
								cx="50%"
								cy="50%"
								outerRadius={86}
								innerRadius={64}
								strokeWidth={8}
								labelLine={false}
								label={({ index, ...rest }) => (
									<ProductsPieLabel {...rest} product={data[index].product} />
								)}
							>
								{data.map((_, index) => (
									<Cell
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										key={`cell-${index}`}
										fill={COLORS[index]}
										className="stroke-card"
									/>
								))}
							</Pie>
						</PieChart>
					</ResponsiveContainer>
				)}
			</CardContent>
		</Card>
	);
}
