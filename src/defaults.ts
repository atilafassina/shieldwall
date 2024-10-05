import { DEV_DEFAULT_CSP, PROD_DEFAULT_CSP } from "./lib/csp/csp.js";
import { HeaderNames, SecHeaders } from "./types.js";

export const HEADER_NAMES: HeaderNames = {
	hsts: "Strict-Transport-Security",
	xFrameOptions: "X-Frame-Options",
	xContentTypeOptions: "X-Content-Type-Options",
	referrerPolicy: "Referrer-Policy",
	permissionsPolicy: "Permissions-Policy",
	xXssProtection: "X-XSS-Protection",
	crossOriginOpenerPolicy: "Cross-Origin-Opener-Policy",
	crossOriginResourcePolicy: "Cross-Origin-Resource-Policy",
	accessControlAllowOrigin: "Access-Control-Allow-Origin",
};

export const DEFAULT_HEADERS = {
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
		prod: {
			withNonce: true,
			value: PROD_DEFAULT_CSP,
			cspReportOnly: true,
			cspBlock: false,
		},
		dev: {
			withNonce: true,
			value: DEV_DEFAULT_CSP,
			cspReportOnly: false,
			cspBlock: true,
		},
	},
} as const;
