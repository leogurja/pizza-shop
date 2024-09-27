import { env } from "@/env";
import { setupWorker } from "msw/browser";
import { createRestaurantMock } from "./create-restaurant-mock";
import { metricsMocks } from "./metrics";
import { signInMock } from "./sign-in-mock";

export const worker = setupWorker(
	signInMock,
	createRestaurantMock,
	...metricsMocks,
);

export async function enableMSW() {
	if (env.MODE !== "test") return;
	await worker.start();
}
