import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";

export function OrderTableRow() {
	return (
		<TableRow>
			<TableCell>
				<Button variant="outline" size="xs">
					<Search className="size-3" />
					<span className="sr-only">Detalhes do pedido</span>
				</Button>
			</TableCell>
			<TableCell className="font-medium font-mono text-xs">
				98fdjsan3h74nf8391
			</TableCell>
			<TableCell className="text-muted-foreground">há 15 minutos</TableCell>
			<TableCell>
				<div className="flex items-center gap-2">
					<span className="size-2 rounded-full bg-slate-400" />
					<span className="font-medium text-muted-foreground">Pendente</span>
				</div>
			</TableCell>
			<TableCell className="font-medium">
				Leonardo Gurgel Maciel Ferreira
			</TableCell>
			<TableCell className="font-medium">R$ 149,90</TableCell>
			<TableCell className="">
				<Button variant="ghost" size="xs">
					<ArrowRight className="mr-2 size-3" /> Aprovar
				</Button>
			</TableCell>
			<TableCell className="">
				<Button variant="ghost" size="xs">
					<X className="mr-2 size-3" /> Cancelar
				</Button>
			</TableCell>
		</TableRow>
	);
}
