import { HEADER_NAMES } from "../defaults.js";
import { type SecHeaders } from "../types.js";
import { deepFallbackMerge, keyIsHeader } from "../helpers/utils.js";
import { DEFAULT_HEADERS } from "../defaults.js";

export function attachSecHeaders(
	settings: SecHeaders,
	attacher: (headerName: string, headerValue: string) => void,
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

export const handleSecurityHeaders = (options?: Partial<SecHeaders>) => {
	return options
		? deepFallbackMerge<SecHeaders>(DEFAULT_HEADERS, options)
		: DEFAULT_HEADERS;
};
