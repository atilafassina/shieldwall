interface HardwarePermissions {
	camera?: string;
	microphone?: string;
	geolocation?: string;
	payment?: string;
}

export function permissionsPolicy(perms: HardwarePermissions) {
	const headerValue: string[] = [];

	for (const [key, value] of Object.entries(perms)) {
		if (typeof value === "string") {
			headerValue.push(`${key}=${value}`);
		}
	}

	return headerValue.join(", ");
}
