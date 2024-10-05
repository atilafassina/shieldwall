import { type FetchEvent } from "@solidjs/start/server";
import { type SecHeaders } from "./types.js";
import crypto from "node:crypto";
import { appendHeader } from "vinxi/http";
import { DEFAULT_HEADERS, HEADER_NAMES } from "./defaults.js";
import { keyIsHeader } from "./utils.js";
import { generateCSP } from "./lib/csp.js";

export const secureRequest = (options?: SecHeaders) => (event: FetchEvent) => {
	const settings: SecHeaders = { ...DEFAULT_HEADERS, ...options };

	const chooseCSP = () => {
		if (!settings.csp) {
			return;
		}
		if (process.env.NODE_ENV === "development") {
			return settings.csp.dev || settings.csp.prod;
		} else {
			return settings.csp.prod;
		}
	};

	const nonce = crypto.randomBytes(16).toString("base64");
	event.locals.nonce = nonce;

	const entries = Object.entries(settings) as Array<
		[keyof SecHeaders, string | null]
	>;

	entries.forEach(([configKey, headerValue]) => {
		if (headerValue === null) {
			return;
		}

		if (keyIsHeader(configKey)) {
			const key = HEADER_NAMES[configKey];

			appendHeader(event.nativeEvent, key, headerValue);
		}
	});

	const csp = chooseCSP();

	if (csp) {
		appendHeader(
			event.nativeEvent,
			csp.cspBlock || !csp.cspReportOnly
				? "Content-Security-Policy"
				: "Content-Security-Policy-Report-Only",
			generateCSP(csp.value, nonce),
		);
	}
};
