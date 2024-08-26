export class Optional<T> {
	private constructor(private value?: T) {}

	public static from<T>(value?: T | null): Optional<T> {
		return new Optional(value ?? undefined);
	}

	public static empty<T>() {
		return new Optional<T>();
	}

	filter(fn: (value: T) => boolean) {
		if (this.value == null || fn(this.value)) return this;
		return new Optional();
	}

	map<U>(fn: (value: T) => U): Optional<U> {
		if (this.value == null) return Optional.empty();

		return new Optional(fn(this.value));
	}

	flatMap<U>(fn: (value: T) => Optional<U>): Optional<U> {
		if (this.value == null) return Optional.empty();
		return fn(this.value);
	}

	inspect<U>(fn: (value: T) => U): Optional<T> {
		if (this.value != null) fn(this.value);
		return this;
	}

	match<U>(some: (value: T) => U, none: () => U) {
		if (this.value == null) return none();
		return some(this.value);
	}

	isSome() {
		return this.value != null;
	}

	isNone() {
		return !this.isSome();
	}

	unwrap(message = "value is null!") {
		if (this.value == null) throw new Error(message);
		return this.value;
	}

	unwrapOr(t: T) {
		if (this.value == null) return t;
		return this.value;
	}

	unwrapOrElse(fn: () => T) {
		if (this.value == null) return fn();
		return this.value;
	}
}
