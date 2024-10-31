import { type H3Event } from "h3";
import { type SecHeaders } from "./lib/types.js";
import { h3Attacher, handleSecurityHeaders } from "./lib/helpers/h3.js";
import { attachSecHeaders } from "./lib/security-headers/attach-sec-headers.js";

export const secureRequest =
	(options?: Partial<SecHeaders>) => (event: H3Event["context"]) => {
		const { csp, nonce, ...secHeaders } = handleSecurityHeaders(options);

		const addHeader = h3Attacher(event.nativeEvent);
		attachSecHeaders(secHeaders, addHeader);

		if (csp) {
			console.log("CSP::", csp.name, csp.value);
			addHeader(csp.name, csp.value);
		}

		event.locals.nonce = nonce;
	};
