import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

interface AuthenticationMagicLinkTemplateProps {
	userEmail: string;
	authLink: string;
}

export function AuthenticationMagicLinkTemplate({
	userEmail,
	authLink,
}: AuthenticationMagicLinkTemplateProps) {
	const previewText = "Faça login na Pizza Shop";

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="mx-auto my-auto bg-white font-sans">
					<Container className="mx-auto my-[40px] w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]">
						<Section className="mt-[32px] text-center">
							<span className="text-2xl">🍕</span>
						</Section>
						<Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
							Faça login na Pizza Shop
						</Heading>
						<Text className="text-[14px] text-black leading-[24px]">
							Você solicitou um link para login na Pizza Shop através do email{" "}
							{userEmail}.
						</Text>
						<Section className="mt-[32px] mb-[32px] text-center">
							<Button
								className="rounded bg-sky-500 px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
								href={authLink}
							>
								Entrar agora
							</Button>
						</Section>
						<Text className="text-[14px] text-black leading-[24px]">
							ou copie a URL abaixo e cole em seu browser:{" "}
							<Link href={authLink} className="text-sky-500 no-underline">
								{authLink}
							</Link>
						</Text>
						<Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
						<Text className="text-[#666666] text-[12px] leading-[24px]">
							Se você não solicitou esse link de autenticação, apenas descarte
							esse e-mail.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
