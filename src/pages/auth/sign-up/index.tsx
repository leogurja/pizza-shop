import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { z } from "zod";

import { createRestaurant } from "@/api/restaurant";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const signUpForm = z.object({
	email: z.string().email(),
	restaurantName: z.string(),
	managerName: z.string(),
	phone: z.string(),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<SignUpForm>();

	const navigate = useNavigate();

	const { mutateAsync: signUp } = useMutation({
		mutationFn: createRestaurant,
	});

	const handleSignUp = handleSubmit(async (data) => {
		try {
			await signUp(data);
			toast.success("Restaurante cadastrado com sucesso!", {
				action: {
					label: "Login",
					onClick: () => navigate(`/sign-in?email=${data.email}`),
				},
			});
		} catch {
			toast.error("Erro ao cadastrar restaurante.");
		}
	});

	return (
		<>
			<Helmet title="Cadastro" />
			<div className="p-8">
				<Button asChild className="absolute top-8 right-8" variant="ghost">
					<Link to={"/sign-in"}>Fazer login</Link>
				</Button>
				<div className="flex w-[350px] flex-col justify-center gap-6">
					<div className="flex flex-col gap-2 text-center">
						<h1 className="font-semibold text-2xl tracking-tight">
							Criar conta grátis
						</h1>
						<p className="text-muted-foreground text-sm">
							Seja um parceiro e comece suas vendas!
						</p>
					</div>

					<form className="space-y-4" onSubmit={handleSignUp}>
						<div className="space-y-2">
							<Label htmlFor="restaurantName">Nome do estabelecimento</Label>
							<Input
								id="restaurantName"
								type="text"
								{...register("restaurantName")}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="managerName">Seu nome</Label>
							<Input
								id="managerName"
								type="text"
								{...register("managerName")}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Seu email</Label>
							<Input id="email" type="email" {...register("email")} />
						</div>

						<div className="space-y-2">
							<Label htmlFor="phone">Seu celular</Label>
							<Input id="phone" type="tel" {...register("phone")} />
						</div>

						<Button className="w-full" type="submit" disabled={isSubmitting}>
							Finalizar cadastro
						</Button>

						<p className="px-6 text-center text-muted-foreground text-sm/relaxed">
							Ao continuar, você concorda com nossos{" "}
							<a
								href="#terms-of-service"
								target="_blank"
								rel="noreferrer"
								className="underline underline-offset-4"
							>
								Termos de serviço
							</a>{" "}
							e{" "}
							<a
								href="#privacy-policy"
								target="_blank"
								rel="noreferrer"
								className="underline underline-offset-4"
							>
								políticas de privacidade
							</a>
							.
						</p>
					</form>
				</div>
			</div>
		</>
	);
}
