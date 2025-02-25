import { type FetchEvent } from "@solidjs/start/server";
import { h3Attacher } from "../../lib/helpers/h3.js";
import {
	attachSecHeaders,
	handleSecurityHeaders,
} from "../../lib/security-headers/attach-sec-headers.js";
import { type SecHeaders } from "../../lib/types.js";

export const secureRequest =
	(options?: Partial<SecHeaders>) => (event: FetchEvent) => {
		const secHeaders = handleSecurityHeaders(options);
		const addHeader = h3Attacher(event.nativeEvent);

		attachSecHeaders(secHeaders, addHeader);
	};
