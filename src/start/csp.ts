import crypto from "node:crypto";
import { type FetchEvent } from "@solidjs/start/server";
import { h3Attacher } from "../lib/helpers/h3.js";
import { generateCSP } from "../lib/csp/generate-csp.js";
import { isDev } from "../lib/helpers/utils.js";
import { CSP } from "../lib/types.js";
import { CSPTemplate, templates } from "../lib/csp/csp-templates.js";
import { deepMerge } from "../lib/helpers/deep-merge.js";

interface CSPConfigParams {
	extend?: CSPTemplate;
	config: CSP;
}

interface AttachParams extends CSPConfigParams {
	requestEvent: FetchEvent;
}

export function buildCSP({ config, extend }: CSPConfigParams) {
	if (!config.value && !extend) {
		throw new Error("CSP config must have a value or extend a template");
	}

	const cspValue = deepMerge(
		extend ? templates[extend] : {},
		config.value ?? {},
	);
	const name = config.reportOnly
		? "Content-Security-Policy-Report-Only"
		: "Content-Security-Policy";

	if (config.withNonce) {
		const nonce = crypto.randomBytes(16).toString("base64");
		const value = generateCSP(cspValue, nonce);

		return { name, value, nonce };
	} else {
		const value = generateCSP(cspValue);

		return { name, value };
	}
}

export function attachCSP({ requestEvent, ...cspParams }: AttachParams) {
	const addHeader = h3Attacher(requestEvent.nativeEvent);
	const { name, value, nonce } = buildCSP(cspParams);

	requestEvent.locals.nonce = nonce;

	addHeader(name, value);
	if (isDev) {
		console.info("CSPAttached:: ", name, value);
	}
}
