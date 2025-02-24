import { describe, test, expect, vi } from "vitest";
import { UNSAFE_INLINE, SELF, NONE, UNSAFE_EVAL } from "csp-header";
import { buildCSP } from "../../start/csp.js";

const expect_production_basic = "default-src 'self'; object-src 'none';";
const expect_hmr_friendly =
	"default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src-elem 'self' 'unsafe-inline'; connect-src 'self' ws://localhost:*; img-src 'self' data: blob:; font-src 'self';";

describe("Attach CSP", () => {
	test("should match the default if extend with no value", () => {
		const result_production = buildCSP({
			extend: "production_basic",
			config: {
				reportOnly: true,
				withNonce: false,
			},
		});
		const result_hmr = buildCSP({
			extend: "dev_hmr_friendly",
			config: {
				reportOnly: true,
				withNonce: false,
			},
		});

		expect(result_production.name).toMatch(
			"Content-Security-Policy-Report-Only",
		);
		expect(result_production.value).toMatch(expect_production_basic);
		expect(result_hmr.value).toMatch(expect_hmr_friendly);
	});

	test("should match the default if extend with no value", () => {
		const result = buildCSP({
			extend: "production_basic",
			config: {
				reportOnly: true,
				withNonce: false,
			},
		});

		expect(result.name).toMatch("Content-Security-Policy-Report-Only");
		expect(result.value).toMatch("default-src 'self'; object-src 'none';");
	});

	test("should be 'Content-Security-Policy' if `reportOnly === false`", () => {
		const result = buildCSP({
			extend: "production_basic",
			config: {
				reportOnly: false,
				withNonce: false,
			},
		});

		expect(result.name).toMatch("Content-Security-Policy");
		expect(result.value).toMatch(expect_production_basic);
	});

	test("should be extend default when provided user definition", () => {
		const result = buildCSP({
			extend: "production_basic",
			config: {
				value: {
					"frame-src": ["https://example.com"],
				},
				reportOnly: false,
				withNonce: false,
			},
		});

		expect(result.name).toMatch("Content-Security-Policy");
		expect(result.value).toMatch(
			expect_production_basic + " frame-src https://example.com;",
		);
	});

	test("should include additional directives when merged", () => {
		const result = buildCSP({
			extend: "production_basic",
			config: {
				value: {
					"frame-src": ["https://example.com"],
					"script-src": ["https://another-example.com"],
				},
				reportOnly: false,
				withNonce: false,
			},
		});

		expect(result.value).toMatch(
			expect_production_basic +
				" frame-src https://example.com; script-src https://another-example.com;",
		);
	});
});
