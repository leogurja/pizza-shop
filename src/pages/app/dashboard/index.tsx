import { Helmet } from "react-helmet-async";
import { DailyOrdersAmount } from "./daily-orders-amount";
import { MonthlyCanceledOrdersAmount } from "./monthly-canceled-orders-amount";
import { MonthlyOrdersAmount } from "./monthly-orders-amount";
import { MonthlyRevenueCard } from "./monthly-revenue";

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
			</div>
		</>
	);
}
