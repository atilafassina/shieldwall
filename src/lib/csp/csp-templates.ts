import { NONE, SELF, UNSAFE_EVAL, UNSAFE_INLINE } from "csp-header";

export const templates = {
	dev_hmr_friendly: {
		"default-src": [SELF],
		"script-src": [SELF, UNSAFE_EVAL, UNSAFE_INLINE],
		"style-src-elem": [SELF, UNSAFE_INLINE],
		"connect-src": [SELF, "ws://localhost:*"],
		"img-src": [SELF, "data:", "blob:"],
		"font-src": [SELF],
	},
	production_basic: {
		"default-src": [SELF],
		"object-src": [NONE],
	},
};

export type CSPTemplate = keyof typeof templates;
