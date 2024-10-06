import { type FetchEvent } from "@solidjs/start/server";
import { type SecHeaders } from "./types.js";
import crypto from "node:crypto";
import { appendHeader } from "vinxi/http";
import { DEFAULT_HEADERS, HEADER_NAMES } from "./defaults.js";
import { deepFallbackMerge, keyIsHeader } from "./utils.js";
import { chooseCSP, generateCSP } from "./lib/csp.js";

const h3Attacher =
	(event: FetchEvent["nativeEvent"]) => (key: string, headerValue: string) => {
		appendHeader(event, key, headerValue);
	};

function attachSecHeaders(
	settings: SecHeaders,
	attacher: ReturnType<typeof h3Attacher>,
) {
	const entries = Object.entries(settings) as Array<
		[keyof SecHeaders, string | null]
	>;
	for (const [configKey, headerValue] of entries) {
		if (headerValue === null) {
			return;
		}

		if (keyIsHeader(configKey)) {
			attacher(HEADER_NAMES[configKey], headerValue);
		}
	}
}

// SolidStart FetchEvent is H3Event["context"]
export const secureRequest =
	(options?: Partial<SecHeaders>) => (event: FetchEvent) => {
		const settings = options
			? deepFallbackMerge<SecHeaders>(options, DEFAULT_HEADERS)
			: DEFAULT_HEADERS;
		const addHeader = h3Attacher(event.nativeEvent);
		const csp = chooseCSP(settings);

		const nonce = crypto.randomBytes(16).toString("base64");
		event.locals.nonce = nonce;

		attachSecHeaders(settings, addHeader);

		if (csp) {
			addHeader(
				csp.cspBlock || !csp.cspReportOnly
					? "Content-Security-Policy"
					: "Content-Security-Policy-Report-Only",
				generateCSP(csp.value, nonce),
			);
		}
	};
