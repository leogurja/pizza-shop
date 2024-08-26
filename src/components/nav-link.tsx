import {
	type LinkProps,
	NavLink as ReactRouterNavLink,
} from "react-router-dom";

export function NavLink(props: LinkProps) {
	return (
		<ReactRouterNavLink
			className="flex items-center gap-1.5 font-medium text-muted-foreground text-sm hover:text-foreground aria-[current=page]:text-foreground"
			{...props}
		/>
	);
}
