interface Params {
	includeSubDomains?: boolean;
	preload?: boolean;
	maxAge: number;
}

export function hsts({
	includeSubDomains = true,
	preload = true,
	maxAge = 31536000 /* 1year */,
}: Params) {
	return `max-age=${String(maxAge)};${includeSubDomains ? " includeSubDomains;" : ""}${
		preload ? " preload" : ""
	}`;
}
