import { api } from "@/lib/axios";

interface GetDayOrdersAmountResponse {
	amount: number;
	diffFromYesterday: number;
}

interface GetMonthOrdersAmountResponse {
	amount: number;
	diffFromLastMonth: number;
}

interface GetMonthRevenueResponse {
	receipt: number;
	diffFromLastMonth: number;
}

type GetPopularProductsResponse = {
	product: string;
	amount: number;
}[];

type GetDailyRevenueInPeriodResponse = {
	date: string;
	receitp: number;
}[];

export async function getDayOrdersAmount() {
	const response = await api.get<GetDayOrdersAmountResponse>(
		"/metrics/day-orders-amount",
	);
	return response.data;
}

export async function getMonthOrdersAmount() {
	const response = await api.get<GetMonthOrdersAmountResponse>(
		"/metrics/month-orders-amount",
	);
	return response.data;
}

export async function getMonthCanceledOrdersAmount() {
	const response = await api.get<GetMonthOrdersAmountResponse>(
		"/metrics/month-canceled-orders-amount",
	);
	return response.data;
}

export async function getMonthRevenue() {
	const response = await api.get<GetMonthRevenueResponse>(
		"/metrics/month-receipt",
	);
	return response.data;
}

export async function getPopularProducts() {
	const response = await api.get<GetPopularProductsResponse>(
		"/metrics/popular-products",
	);
	return response.data;
}

export async function getDailyRevenueInPeriod() {
	const response = await api.get<GetDailyRevenueInPeriodResponse>(
		"/metrics/daily-receipt-in-period",
	);
	return response.data;
}
