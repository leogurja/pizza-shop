import { getProfile } from "@/api/get-profile";
import { getRestaurant } from "@/api/get-restaurant";
import { useQuery } from "@tanstack/react-query";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

export function AccountMenu() {
	const { data: profile, isLoading: isLoadingProfile } = useQuery({
		queryFn: getProfile,
		queryKey: ["profile"],
	});

	const { data: restaurant, isLoading: isLoadingRestaurant } = useQuery({
		queryKey: ["restaurant"],
		queryFn: getRestaurant,
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="flex select-none items-center gap-2"
				>
					{isLoadingRestaurant ? (
						<Skeleton className="h-4 w-40" />
					) : (
						restaurant?.name
					)}
					<ChevronDown className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel className="flex flex-col">
					{isLoadingProfile ? (
						<div className="space-y-1.5">
							<Skeleton className="h-4 w-32" />
							<Skeleton className="h-3 w-24" />
						</div>
					) : (
						<>
							<span>{profile?.name}</span>
							<span className="font-normal text-muted-foreground text-xs">
								{profile?.email}
							</span>
						</>
					)}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Building className="mr-2 size-4" />
					<span>Perfil da loja</span>
				</DropdownMenuItem>
				<DropdownMenuItem className="text-rose-500 dark:text-rose-400">
					<LogOut className="mr-2 size-4" />
					<span>Sair</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
