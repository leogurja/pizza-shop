import { Helmet } from "react-helmet-async";
import { DailyOrdersAmount } from "./cards/daily-orders-amount";
import { MonthlyCanceledOrdersAmount } from "./cards/monthly-canceled-orders-amount";
import { MonthlyOrdersAmount } from "./cards/monthly-orders-amount";
import { MonthlyRevenueCard } from "./cards/monthly-revenue";
import { PopularProductsChart } from "./charts/popular-products-chart";
import { RevenueChart } from "./charts/revenue-chart";

export function Dashboard() {
	return (
		<>
			<Helmet title="Dashboard" />
			<div className="flex flex-col gap-4">
				<h1 className="font-bold text-3xl tracking-tight">Dashboard</h1>

				<div className="grid grid-cols-4 gap-4">
					<MonthlyRevenueCard />
					<MonthlyOrdersAmount />
					<DailyOrdersAmount />
					<MonthlyCanceledOrdersAmount />
				</div>

				<div className="grid grid-cols-9 gap-4">
					<RevenueChart />
					<PopularProductsChart />
				</div>
			</div>
		</>
	);
}
