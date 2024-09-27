import { api } from "@/lib/axios";
import type { DateRange } from "react-day-picker";

export interface GetDayOrdersAmountResponse {
	amount: number;
	diffFromYesterday: number;
}

export interface GetMonthOrdersAmountResponse {
	amount: number;
	diffFromLastMonth: number;
}

export interface GetMonthRevenueResponse {
	receipt: number;
	diffFromLastMonth: number;
}

export type GetPopularProductsResponse = {
	product: string;
	amount: number;
}[];

export type GetDailyRevenueInPeriodResponse = {
	date: string;
	receipt: number;
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

export async function getDailyRevenueInPeriod(dateRange?: DateRange) {
	const response = await api.get<GetDailyRevenueInPeriodResponse>(
		"/metrics/daily-receipt-in-period",
		{ params: dateRange },
	);
	return response.data;
}
