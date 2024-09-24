import { signOut } from "@/api/sign-out";
import { useMutation } from "@tanstack/react-query";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StoreProfileDialog } from "../store-profile-dialog";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ProfileInfo } from "./profile-info";
import { RestaurantName } from "./restaurant-name";

export function AccountMenu() {
	const navigate = useNavigate();

	const { mutateAsync: doSignOut, isPending: isSigninOut } = useMutation({
		mutationFn: signOut,
		onSuccess: () => navigate("/sign-in", { replace: true }),
	});

	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="flex select-none items-center gap-2"
					>
						<RestaurantName />
						<ChevronDown className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-56">
					<DropdownMenuLabel className="flex flex-col">
						<ProfileInfo />
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
