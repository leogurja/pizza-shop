import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

export function OrderTableFilters() {
	return (
		<form className="flex items-center gap-2">
			<span className="font-semibold text-sm">Filtros:</span>
			<Input placeholder="Id do pedido" className="h-8 w-auto" />
			<Input placeholder="Nome do cliente" className="h-8 w-[320px]" />
			<Select defaultValue="all">
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">Todos status</SelectItem>
					<SelectItem value="pending">Pendente</SelectItem>
					<SelectItem value="canceled">Cancelado</SelectItem>
					<SelectItem value="processing">Em preparo</SelectItem>
					<SelectItem value="delivering">Em entrega</SelectItem>
					<SelectItem value="delivered">Entregue</SelectItem>
				</SelectContent>
			</Select>

			<Button type="submit" variant="secondary" size="xs">
				<Search className="mr-2 size-4" />
				Filtrar resultados
			</Button>
			<Button type="reset" variant="outline" size="xs">
				<X className="mr-2 size-4" />
				Remover filtros
			</Button>
		</form>
	);
}
