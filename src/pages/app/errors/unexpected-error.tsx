import { Link, useRouteError } from "react-router-dom";

export function UnexpectedError() {
	const error = useRouteError() as Error;

	return (
		<div className="gap2 flex h-screen flex-col items-center justify-center">
			<h1 className="font-bold text-4xl">Whoops, algo aconteceu...</h1>
			<p className="text-accent-foreground">
				Um erro aconteceu na aplicação, abaixo você encontra mais detalhes
			</p>
			<pre>{error?.message || JSON.stringify(error)}</pre>
			<p className="text-accent-foreground">
				Voltar para o{" "}
				<Link to="/" className="text-sky-600 dark:text-sky-400">
					Dashboard
				</Link>
			</p>
		</div>
	);
}
