import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ban } from "lucide-react";

export function MonthlyCanceledOrdersAmount() {
	return (
		<Card>
			<CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="font-semibold text-base">
					Cancelamentos (mês)
				</CardTitle>
				<Ban className="size-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="space-y-1">
				<span className="font-bold text-2xl tracking-tight">32</span>
				<p className="text-muted-foreground text-xs">
					<span className="text-emerald-500 dark:text-emerald-400">-2%</span> em
					relação ao mês passado.
				</p>
			</CardContent>
		</Card>
	);
}
