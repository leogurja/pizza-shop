import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { z } from "zod";

import { signIn } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";

const signInForm = z.object({
	email: z.string().email(),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
	const [params] = useSearchParams();
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<SignInForm>({
		defaultValues: {
			email: params.get("email") ?? "",
		},
	});

	const { mutateAsync: authenticate } = useMutation({
		mutationFn: signIn,
	});

	const handleSignIn = handleSubmit(async (data) => {
		try {
			await authenticate(data);
			toast.success("Enviamos um link de autenticação para o seu email");
		} catch {
			toast.error("Credenciais inválidas");
		}
	});

	return (
		<>
			<Helmet title="login" />
			<div className="p-8">
				<Button asChild className="absolute top-8 right-8" variant="ghost">
					<Link to={"/sign-up"}>Seja um parceiro</Link>
				</Button>
				<div className="flex w-[350px] flex-col justify-center gap-6">
					<div className="flex flex-col gap-2 text-center">
						<h1 className="font-semibold text-2xl tracking-tight">
							Acessar painel
						</h1>
						<p className="text-muted-foreground text-sm">
							Acompanhe suas vendas pelo painel do parceiro!
						</p>
					</div>

					<form className="space-y-4" onSubmit={handleSignIn}>
						<div className="space-y-2">
							<Label htmlFor="email">Seu email</Label>
							<Input id="email" type="email" {...register("email")} />
						</div>

						<Button className="w-full" type="submit" disabled={isSubmitting}>
							Acessar painel
						</Button>
					</form>
				</div>
			</div>
		</>
	);
}
