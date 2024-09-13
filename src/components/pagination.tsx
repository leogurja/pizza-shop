import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";
import { Button } from "./ui/button";

export interface PaginationProps {
	pageIndex: number;
	totalCount: number;
	perPage: number;
	onPageChange: (pageIndex: number) => Promise<void> | void;
}

export function Pagination({
	pageIndex,
	totalCount,
	perPage,
	onPageChange,
}: PaginationProps) {
	const totalPages = Math.ceil(totalCount / perPage) || 1;

	return (
		<div className="flex items-center justify-between">
			<span className="text-muted-foreground text-sm">
				Total de {totalCount} item(s)
			</span>

			<div className="flex items-center gap-6 lg:gap-8">
				<div className="font-medium text-sm">
					Página {pageIndex + 1} de {totalPages}
				</div>
				<div className="flex items-center gap-2">
					<Button
						onClick={() => onPageChange(0)}
						variant="outline"
						className="size-8 p-0"
						disabled={pageIndex === 0}
					>
						<ChevronsLeft className="size-4" />
						<span className="sr-only">Primeira página</span>
					</Button>
					<Button
						onClick={() => onPageChange(pageIndex - 1)}
						disabled={pageIndex === 0}
						variant="outline"
						className="size-8 p-0"
					>
						<ChevronLeft className="size-4" />
						<span className="sr-only">Página anterior</span>
					</Button>
					<Button
						onClick={() => onPageChange(pageIndex + 1)}
						disabled={pageIndex === totalPages - 1}
						variant="outline"
						className="size-8 p-0"
					>
						<ChevronRight className="size-4" />
						<span className="sr-only">Próxima página</span>
					</Button>
					<Button
						onClick={() => onPageChange(totalPages - 1)}
						disabled={pageIndex === totalPages - 1}
						variant="outline"
						className="size-8 p-0"
					>
						<ChevronsRight className="size-4" />
						<span className="sr-only">Última página</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
