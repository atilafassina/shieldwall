import { describe, test, expect } from "vitest";

describe("🛡️ ShieldWall", () => {
	test("should return an object with all headers", () => {
		expect({}).toMatchObject({
			hsts: "max-age=31536000; includeSubDomains; preload",
			xFrameOptions: "DENY",
			xContentTypeOptions: "nosniff",
			referrerPolicy: "same-origin",
			permissionsPolicy: null,
			xXssProtection: "1; mode=block",
			crossOriginOpenerPolicy: "same-origin",
			crossOriginResourcePolicy: "same-site",
			accessControlAllowOrigin: null,
			csp: {
				title: "Content-Security-Policy-Report-Only",
				value: "...",
			},
		});
	});
});
