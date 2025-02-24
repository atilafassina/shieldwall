import { appendHeader, type H3Event } from "h3";

export const h3Attacher =
	(event: H3Event["context"]["nativeEvent"]) =>
	(key: string, headerValue: string) => {
		appendHeader(event, key, headerValue);
	};
