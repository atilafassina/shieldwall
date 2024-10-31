import { HEADER_NAMES } from "../defaults.js";
import { type SecHeaders } from "../types.js";
import { keyIsHeader } from "../helpers/utils.js";

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
