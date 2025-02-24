import { describe, test, expect } from "vitest";
import { handleSecurityHeaders } from "./attach-sec-headers.js";
import { DEFAULT_HEADERS } from "../defaults.js";

describe("Security Headers", () => {
	test("Returns default when no option is provided", () => {
		expect(handleSecurityHeaders()).toEqual(DEFAULT_HEADERS);
	});
	test("Handles custom options correctly", () => {
		const customValue = "max-age=001; includeSubDomains";
		const options = {
			hsts: customValue,
		};
		const expected = { ...DEFAULT_HEADERS, hsts: customValue };

		expect(handleSecurityHeaders(options)).toEqual(expected);
	});
});
