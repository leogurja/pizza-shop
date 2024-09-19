import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const validStatuses = [
	"all",
	"pending",
	"canceled",
	"processing",
	"delivering",
	"delivered",
] as const;

const orderFiltersSchema = z.object({
	orderId: z.string().optional(),
	customerName: z.string().optional(),
	status: z.enum(validStatuses).optional(),
});

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>;

export function OrderTableFilters() {
	const [searchParams, setSearchParams] = useSearchParams();
	const orderId = searchParams.get("orderId") ?? "";
	const customerName = searchParams.get("customerName") ?? "";
	const status =
		(searchParams.get("status") as (typeof validStatuses)[number]) ?? "all";

	const { register, handleSubmit, control, reset } =
		useForm<OrderFiltersSchema>({
			resolver: zodResolver(orderFiltersSchema),
			defaultValues: {
				orderId,
				customerName,
				status,
			},
		});

	const handleClear = () => {
		setSearchParams((state) => {
			state.delete("orderId");
			state.delete("customerName");
			state.delete("status");
			state.set("page", "1");

			reset({ status: "all" });
			return state;
		});
	};

	const handleFilter = handleSubmit(({ orderId, customerName, status }) => {
		setSearchParams((prev) => {
			if (!orderId) {
				prev.delete("orderId");
			} else {
				prev.set("orderId", orderId);
			}

			if (!customerName) {
				prev.delete("customerName");
			} else {
				prev.set("customerName", customerName);
			}

			if (!status) {
				prev.delete("status");
			} else {
				prev.set("status", status);
			}

			return prev;
		});
	});

	return (
		<form
			className="flex items-center gap-2"
			onSubmit={handleFilter}
			onReset={handleClear}
		>
			<span className="font-semibold text-sm">Filtros:</span>
			<Input
				placeholder="Id do pedido"
				className="h-8 w-auto"
				{...register("orderId")}
			/>
			<Input
				placeholder="Nome do cliente"
				className="h-8 w-[320px]"
				{...register("customerName")}
			/>
			<Controller
				name="status"
				control={control}
				defaultValue="all"
				render={({ field: { name, onChange, value, disabled } }) => (
					<Select
						defaultValue="all"
						name={name}
						onValueChange={onChange}
						value={value}
						disabled={disabled}
					>
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
				)}
			/>

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
