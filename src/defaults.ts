import { SELF, UNSAFE_EVAL, UNSAFE_INLINE } from "csp-header";
import { CSP, type HeaderNames } from "./types.js";

export const PROD_DEFAULT_CSP: CSP["value"] = {
	"default-src": [SELF],
	"frame-src": [SELF],
	"script-src": [SELF],
	"style-src": [SELF],
	"style-src-elem": [SELF, UNSAFE_INLINE],
	"connect-src": [SELF],
	"img-src": [SELF],
	"object-src": [],
};

export const DEV_DEFAULT_CSP: CSP["value"] = {
	"default-src": [SELF],
	"frame-src": [SELF],
	"script-src": [SELF, UNSAFE_EVAL],
	"style-src": [SELF],
	"style-src-elem": [SELF, UNSAFE_INLINE],
	"connect-src": [SELF, "ws://localhost:*"],
	"img-src": [SELF],
	"object-src": [],
};

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
