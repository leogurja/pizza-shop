import { z } from "zod";

const envSchema = z.object({
	VITE_API_URL: z.string(),
	VITE_ENABLE_API_DELAY: z
		.string()
		.default("false")
		.transform((v) => v === "true"),
	MODE: z.enum(["production", "development", "test"]).default("development"),
});

export const env = envSchema.parse(import.meta.env);
