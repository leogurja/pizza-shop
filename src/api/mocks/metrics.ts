import { http, HttpResponse } from "msw";
import type {
	GetDailyRevenueInPeriodResponse,
	GetDayOrdersAmountResponse,
	GetMonthOrdersAmountResponse,
	GetMonthRevenueResponse,
	GetPopularProductsResponse,
} from "../metrics";

export const getDayOrdersAmountMock = http.get<
	never,
	never,
	GetDayOrdersAmountResponse
>("/metrics/day-orders-amount", () => {
	return HttpResponse.json({
		amount: 20,
		diffFromYesterday: -5,
	});
});

export const getMonthOrdersAmountMock = http.get<
	never,
	never,
	GetMonthOrdersAmountResponse
>("/metrics/month-orders-amount", () => {
	return HttpResponse.json({
		amount: 50,
		diffFromLastMonth: -6,
	});
});

export const getMonthCanceledOrdersAmountMock = http.get<
	never,
	never,
	GetMonthOrdersAmountResponse
>("/metrics/month-canceled-orders-amount", () => {
	return HttpResponse.json({
		amount: 200,
		diffFromLastMonth: 7,
	});
});

export const getMonthRevenueMock = http.get<
	never,
	never,
	GetMonthRevenueResponse
>("/metrics/month-receipt", () => {
	return HttpResponse.json({
		receipt: 1000,
		diffFromLastMonth: 10,
	});
});

export const getDailyRevenueInPeriodMock = http.get<
	never,
	never,
	GetDailyRevenueInPeriodResponse
>("/metrics/daily-receipt-in-period", () => {
	return HttpResponse.json([
		{ date: "01/01/2024", receipt: 2000 },
		{ date: "02/01/2024", receipt: 800 },
		{ date: "03/01/2024", receipt: 8000 },
		{ date: "04/01/2024", receipt: 540 },
		{ date: "05/01/2024", receipt: 400 },
		{ date: "06/01/2024", receipt: 700 },
		{ date: "07/01/2024", receipt: 1000 },
	]);
});

export const getPopularProductsMock = http.get<
	never,
	never,
	GetPopularProductsResponse
>("/metrics/popular-products", () => {
	return HttpResponse.json([
		{ product: "Pizza Mussarela", amount: 5 },
		{ product: "Pizza Calabresa", amount: 2 },
		{ product: "Pizza Pepperoni", amount: 50 },
		{ product: "Pizza Margherita", amount: 25 },
		{ product: "Pizza Frango", amount: 700 },
	]);
});

export const metricsMocks = [
	getDayOrdersAmountMock,
	getMonthOrdersAmountMock,
	getMonthCanceledOrdersAmountMock,
	getMonthRevenueMock,
	getDailyRevenueInPeriodMock,
	getPopularProductsMock,
];
