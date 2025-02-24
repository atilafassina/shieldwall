import { describe, test, expect, vi } from "vitest";
import { deepMerge } from "./deep-merge.js";

describe("it works", () => {
	test("Sources replaces existing value in Target", () => {
		const result = deepMerge({ a: 1 }, { a: 2 });
		expect(result).toEqual({ a: 2 });
	});

	test("Sources keeps existing value in Target when keys differ", () => {
		const result = deepMerge({ a: 1 }, { b: 2 });
		expect(result).toEqual({ a: 1, b: 2 });
	});

	test("Sources keeps existing value in Target when keys differ and replaces overlapping value", () => {
		const result = deepMerge({ a: 1, c: 2 }, { b: 2, c: 1 });
		expect(result).toEqual({ a: 1, b: 2, c: 1 });
	});

	test("Nested objects are merged correctly", () => {
		const result = deepMerge({ a: { b: 1 } }, { a: { c: 2 } });
		expect(result).toEqual({ a: { b: 1, c: 2 } });
	});

	test("Nested objects are replaced completely when overlapping", () => {
		const result = deepMerge({ a: { b: 1 } }, { a: { b: 2, c: 3 } });
		expect(result).toEqual({ a: { b: 2, c: 3 } });
	});

	test("Merging objects with array values", () => {
		const result = deepMerge({ a: [1, 2] }, { a: [3, 4] });
		expect(result).toEqual({ a: [3, 4] });
	});

	test("Merging array values with overlapping keys should replace the array", () => {
		const result = deepMerge({ a: [1, 2] }, { a: [3] });
		expect(result).toEqual({ a: [3] });
	});

	test("Merging array values should concatenate if the keys are arrays", () => {
		const result = deepMerge({ a: [1, 2] }, { a: [3, 4] });
		expect(result).toEqual({ a: [3, 4] });
	});

	test("Merging multiple overlapping array values should replace the earlier arrays", () => {
		const result = deepMerge({ a: [1, 2] }, { a: [3, 4], b: [5] });
		expect(result).toEqual({ a: [3, 4], b: [5] });
	});
});
