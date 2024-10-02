import { env } from "@/env";
import { setupWorker } from "msw/browser";
import { metricsMocks } from "./metrics";
import { orderMocks } from "./orders";
import { profileMocks } from "./profile";
import { restaurantMocks } from "./restaurant";
import { signInMock } from "./sign-in-mock";

export const worker = setupWorker(
	signInMock,
	...restaurantMocks,
	...metricsMocks,
	...profileMocks,
	...orderMocks,
);

export async function enableMSW() {
	if (env.MODE !== "test") return;
	await worker.start();
}
