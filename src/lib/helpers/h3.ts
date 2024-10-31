import crypto from "node:crypto";
import { appendHeader, type H3Event } from "h3";
import { SecHeaders } from "../types.js";
import { deepFallbackMerge } from "./utils.js";
import { chooseCSP } from "../csp/csp.js";
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
	const csp = cspConfig ? chooseCSP(cspConfig, nonce) : undefined;

	return { csp, nonce, ...otherHeaders };
};
