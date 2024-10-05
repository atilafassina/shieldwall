import { HEADER_NAMES } from "./defaults.js";
import { type HeaderNames } from "./types.js";

export function deepMerge(
	target: Record<string, unknown>,
	source: Record<string, unknown>,
): Record<string, unknown> {
	for (const key in source) {
		if (source[key] instanceof Object) {
			if (!target[key]) {
				Object.assign(target, { [key]: {} });
			}

			deepMerge(
				target[key] as Record<string, unknown>,
				source[key] as Record<string, unknown>,
			);
		} else {
			Object.assign(target, { [key]: source[key] });
		}
	}
	return target;
}

export const keyIsHeader = (key: string): key is keyof HeaderNames => {
	return Object.prototype.hasOwnProperty.call(HEADER_NAMES, key);
};
