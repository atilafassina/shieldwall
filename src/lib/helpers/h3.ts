import crypto from "node:crypto";
import { appendHeader, type H3Event } from "h3";
import { SecHeaders } from "../types.js";
import { deepFallbackMerge } from "./utils.js";
import { chooseCSP, generateCSP } from "../csp/csp.js";
import { DEFAULT_HEADERS } from "../defaults.js";

export const h3Attacher =
	(event: H3Event["context"]["nativeEvent"]) =>
	(key: string, headerValue: string) => {
		appendHeader(event, key, headerValue);
	};

export const handleSecurityHeaders = (options?: Partial<SecHeaders>) => {
	const { csp: cspConfig, ...otherHeaders } = options
		? deepFallbackMerge<SecHeaders>(options, DEFAULT_HEADERS)
		: DEFAULT_HEADERS;
	const nonce = crypto.randomBytes(16).toString("base64");
	const definedCSP = cspConfig ? chooseCSP(cspConfig, nonce) : null;

	const csp = definedCSP
		? {
				name:
					definedCSP.cspBlock || !definedCSP.cspReportOnly
						? "Content-Security-Policy"
						: "Content-Security-Policy-Report-Only",
				value: generateCSP(definedCSP, nonce),
			}
		: null;

	return { csp, nonce, ...otherHeaders };
};
