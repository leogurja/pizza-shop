export async function awaitResult<T, E extends Error = Error>(
	fn: () => Promise<T>,
) {
	try {
		return [null, await fn()] as const;
	} catch (err) {
		return [err as E, null] as const;
	}
}

export function result<T, E extends Error = Error>(fn: () => T) {
	try {
		return [null, fn()] as const;
	} catch (err) {
		return [(err as E) ?? new Error("error is null"), null] as const;
	}
}
