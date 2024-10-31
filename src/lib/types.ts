import { type CSPDirectives } from "csp-header";

export interface CSPHeaderConfig {
	dev?: CSP;
	prod: CSP;
	reportUri?: string;
}

export type CSP = {
	withNonce: boolean;
	value: Partial<CSPDirectives>;
	cspBlock?: boolean;
	cspReportOnly: boolean;
};

export type SecHeaders = {
	hsts: "max-age=31536000; includeSubDomains; preload" | null | string;
	xFrameOptions: "DENY" | "SAMEORIGIN" | "ALLOW-FROM" | null | string;
	xContentTypeOptions: "nosniff" | null | string;
	referrerPolicy:
		| "no-referrer"
		| "no-referrer-when-downgrade"
		| "same-origin"
		| "origin"
		| "strict-origin"
		| "origin-when-cross-origin"
		| "strict-origin-when-cross-origin"
		| "unsafe-url"
		| null
		| string;
	permissionsPolicy: string | null;
	xXssProtection: "1; mode=block" | null;
	crossOriginOpenerPolicy:
		| "same-origin"
		| "same-origin-allow-popups"
		| "same-origin-allow-popups-unsafe-navigate"
		| "same-origin-allow-popups-unsafe-toplevel"
		| "cross-origin"
		| "cross-origin-allow-popups"
		| "cross-origin-allow-popups-unsafe-navigate"
		| "cross-origin-allow-popups-unsafe-toplevel"
		| "unsafe-none"
		| null;
	crossOriginResourcePolicy:
		| "same-site"
		| "same-origin"
		| "cross-origin"
		| "cross-origin-allow-popups"
		| "cross-origin-allow-popups-unsafe-navigate"
		| "cross-origin-allow-popups-unsafe-toplevel"
		| "cross-origin-allow-popups-same-origin"
		| "cross-origin-allow-popups-same-origin-unsafe-navigate"
		| "unsafe-none"
		| null;
	accessControlAllowOrigin: string | null;
	csp?: {
		prod: CSP;
		dev?: CSP;
	};
};

export interface HeaderNames {
	hsts: "Strict-Transport-Security";
	xFrameOptions: "X-Frame-Options";
	xContentTypeOptions: "X-Content-Type-Options";
	referrerPolicy: "Referrer-Policy";
	permissionsPolicy: "Permissions-Policy";
	xXssProtection: "X-XSS-Protection";
	crossOriginOpenerPolicy: "Cross-Origin-Opener-Policy";
	crossOriginResourcePolicy: "Cross-Origin-Resource-Policy";
	accessControlAllowOrigin: "Access-Control-Allow-Origin";
}
