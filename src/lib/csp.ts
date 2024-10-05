import {
  getCSP,
  nonce,
  CSPDirectives,
} from "csp-header";
import { type CSP, type CSPHeaderConfig } from "../types.js";
import { DEV_DEFAULT_CSP, PROD_DEFAULT_CSP } from "../defaults.js";

const cspNonceDirectives = [
  "script-src",
  "style-src",
  "img-src",
  "font-src",
  "media-src",
  "object-src",
  "default-src",
] as const;

const DEFAULT_CSP: CSPHeaderConfig = {
  prod: {
    withNonce: true,
    value: PROD_DEFAULT_CSP,
    cspBlock: false,
    cspReportOnly: true,
  },
  dev: {
    withNonce: true,
    value: DEV_DEFAULT_CSP,
    cspBlock: true,
    cspReportOnly: false,
  },
};

export const addNonceToDirectives = (
  userDefinedCSP: CSP["value"],
  nonceString: string
): CSP["value"] => {
  const csp: Partial<CSPDirectives> = {
    ...DEFAULT_CSP.prod.value,
    ...userDefinedCSP,
  };

  cspNonceDirectives.forEach((directive) => {
    if (csp[directive] && Array.isArray(csp[directive])) {
      csp[directive].push(nonce(nonceString));
    }
  });

  return csp;
};

export function generateCSP(cspOptions: CSP["value"], nonceString?: string) {
  const directives = nonceString ? addNonceToDirectives(cspOptions, nonceString) : cspOptions;

  if (Object.prototype.hasOwnProperty.call(directives,"report-uri")) {
    const reportUri = directives["report-uri"];
    delete directives["report-uri"];

    return getCSP({ directives, reportUri }) as string;
  } else {
    return getCSP({
      directives,
    }) as string;
  }
}
