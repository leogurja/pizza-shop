import {
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { DialogDescription } from "@radix-ui/react-dialog";

export function OrderDetails() {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Pedido: 489073h9nvbh</DialogTitle>
				<DialogDescription>Detalhes do pedido</DialogDescription>
			</DialogHeader>

			<div className="space-y-6">
				<Table>
					<TableBody>
						<TableRow>
							<TableCell className="text-muted-foreground">Status</TableCell>
							<TableCell className="flex justify-end">
								<div className="flex items-center gap-2">
									<span className="size-2 rounded-full bg-slate-400" />
									<span className="font-medium text-muted-foreground">
										Pendente
									</span>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="text-muted-foreground">Cliente</TableCell>
							<TableCell className="flex justify-end">
								Leonardo Gurgel Maciel Ferreira
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="text-muted-foreground">Telefone</TableCell>
							<TableCell className="flex justify-end">21 9713-7912</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="text-muted-foreground">E-mail</TableCell>
							<TableCell className="flex justify-end">leo@gurgel.io</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="text-muted-foreground">
								Realizado há
							</TableCell>
							<TableCell className="flex justify-end">há 31 minutos</TableCell>
						</TableRow>
					</TableBody>
				</Table>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="text-right">Produto</TableHead>
							<TableHead className="text-right">Qtd.</TableHead>
							<TableHead className="text-right">Preço</TableHead>
							<TableHead className="text-right">Subtotal</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Pizza Pepperoni Família</TableCell>
							<TableCell className="text-right">2</TableCell>
							<TableCell className="text-right">R$ 69,98</TableCell>
							<TableCell className="text-right">R$ 139,96</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Pizza Mussarela Família</TableCell>
							<TableCell className="text-right">1</TableCell>
							<TableCell className="text-right">R$ 59,98</TableCell>
							<TableCell className="text-right">R$ 59,98</TableCell>
						</TableRow>
					</TableBody>
					<TableFooter>
						<TableCell colSpan={3}>Total do pedido</TableCell>
						<TableCell className="text-right font-medium">R$ 199,94</TableCell>
					</TableFooter>
				</Table>
			</div>
		</DialogContent>
	);
}
