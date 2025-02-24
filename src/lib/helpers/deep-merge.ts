export function deepMerge(target: any, source: any): any {
	if (typeof target !== "object" || target === null) {
		return source;
	}

	if (typeof source !== "object" || source === null) {
		return source;
	}

	const output = Array.isArray(target) ? [] : { ...target };

	if (Array.isArray(target) && Array.isArray(source)) {
		return source;
	}

	for (const key in source) {
		if (Array.isArray(source[key])) {
			output[key] = source[key];
		} else if (source[key] instanceof Object) {
			output[key] = deepMerge(target[key], source[key]);
		} else {
			output[key] = source[key];
		}
	}

	return output;
}
