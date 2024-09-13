import { getProfile } from "@/api/get-profile";
import { getRestaurant } from "@/api/get-restaurant";
import { signOut } from "@/api/sign-out";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StoreProfileDialog } from "./store-profile-dialog";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
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
	const navigate = useNavigate();

	const { data: profile, isLoading: isLoadingProfile } = useQuery({
		queryFn: getProfile,
		queryKey: ["profile"],
		staleTime: Number.POSITIVE_INFINITY,
	});

	const { data: restaurant, isLoading: isLoadingRestaurant } = useQuery({
		queryKey: ["restaurant"],
		queryFn: getRestaurant,
		staleTime: Number.POSITIVE_INFINITY,
	});

	const { mutateAsync: doSignOut, isPending: isSigninOut } = useMutation({
		mutationFn: signOut,
		onSuccess: () => {
			navigate("/sign-in", { replace: true });
		},
	});

	return (
		<Dialog>
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
					<DialogTrigger asChild>
						<DropdownMenuItem>
							<Building className="mr-2 size-4" />
							<span>Perfil da loja</span>
						</DropdownMenuItem>
					</DialogTrigger>
					<DropdownMenuItem
						asChild
						className="text-rose-500 dark:text-rose-400"
						disabled={isSigninOut}
					>
						<button
							className="w-full"
							type="button"
							onClick={() => doSignOut()}
						>
							<LogOut className="mr-2 size-4" />
							<span>Sair</span>
						</button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<StoreProfileDialog />
		</Dialog>
	);
}
