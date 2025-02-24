import { HEADER_NAMES } from "../defaults.js";
import { type HeaderNames } from "../types.js";

export function deepFallbackMerge<TargetShape = Record<string, unknown>>(
	fallback: Partial<TargetShape>,
	source: Partial<TargetShape>,
): TargetShape {
	for (const key in source) {
		if (source[key] instanceof Object) {
			if (!fallback[key]) {
				Object.assign(fallback, { [key]: {} });
			}

			deepFallbackMerge(
				fallback[key] as Record<string, unknown>,
				source[key] as Record<string, unknown>,
			);
		} else {
			Object.assign(fallback, { [key]: source[key] });
		}
	}
	return fallback as TargetShape;
}

export const keyIsHeader = (key: string): key is keyof HeaderNames => {
	return Object.prototype.hasOwnProperty.call(HEADER_NAMES, key);
};

export const isProd = process.env.NODE_ENV === "production";
export const isDev = !isProd;
