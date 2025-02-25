import { getCSP, nonce, CSPDirectives } from "csp-header";

type CSPValues = Partial<CSPDirectives>;
const cspNonceDirectives = [
	"script-src",
	"style-src",
	"frame-src",
	"img-src",
	"font-src",
	"media-src",
	"object-src",
	"default-src",
] as const;

const addNonceToDirectives = (
	csp: CSPValues,
	nonceString: string | undefined,
): CSPValues => {
	if (nonceString) {
		cspNonceDirectives.forEach((directive) => {
			if (csp[directive] && Array.isArray(csp[directive])) {
				csp[directive].push(nonce(nonceString));
			}
		});
	}

	return csp;
};

export function generateCSP(cspOptions: CSPValues, nonceString?: string) {
	const directives = nonceString
		? addNonceToDirectives(cspOptions, nonceString)
		: cspOptions;

	if (Object.prototype.hasOwnProperty.call(directives, "report-uri")) {
		const reportUri = directives["report-uri"];
		delete directives["report-uri"];

		return getCSP({ directives, reportUri });
	} else {
		return getCSP({
			directives,
		});
	}
}
