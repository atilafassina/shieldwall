<h1 align="center">ShieldWall</h1>

<p align="center">Security for your Fullstack App 🛡️</p>

## Install

```sh
pnpm add shieldwall
```

## Usage

This package aims to support every framework runtime powered by [h3](https://h3.unjs.io), but at this moment only [SolidStart](https://start.solidjs.com) has first-class adapters.

### SolidStart

The exports are out-of-the-box middleware handlers.
If you need help creating middlewares in SolidStart you can [check the docs](https://docs.solidjs.com/solid-start/advanced/middleware).

```ts
import { createMiddleware } from "@solidjs/start/middleware";
import { securityHeaders, csp, csrf } from "shieldwall/start";
import { SELF } from "shieldwall/start/csp";

export default createMiddleware({
	onRequest: [
		securityHeaders(),
		csp({
			extend: "production_basic",
			config: {
				withNonce: true,
				reportOnly: true,
				value: {
					"frame-src": [SELF],
				},
			},
		}),
		csrf,
	],
});
```

The CSP must add `nonce` on every request and append to script and link tags.

```diff
   import { createHandler, StartServer } from "@solidjs/start/server";

  export default createHandler(
     () => (
       <StartServer
         document={({ assets, children, scripts }) => (
           <html lang="en">
             <head>
             <meta charset="utf-8" />
             <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
             />
             <link rel="icon" href="/favicon.ico" />
             {assets}
           </head>
           <body class="overflow-x-hidden bg-gradient-to-bl from-sky-950
        to-neutral-900">
             <div
               id="app"
               class="bg-blur-purple min-h-screen grid-cols-[auto,1fr,au
       to]"
             >
               {children}
             </div>
             {scripts}
           </body>
         </html>
       )}
     />
   ),
-
+  (event) => ({ nonce: `nonce-${event.locals.nonce}` })
  )
```

## Middlewares

This package exports 2 middlewares to be used as drop-in: `csrfProtection` and `secureRequest`.

### CSRF Protection

In a CSRF (Cross-Site Request Forgery) attack, a malicious actor tricks a user's browser into making unwanted requests to another site where the user is authenticated.
By exploiting the fact that browsers automatically include cookies (including session cookies) with each request to a domain.
This allows the attacker to trigger a mutation in the origin server (e.g.: change of password, email, etc).

There are different strategies to prevent this form of attack, this middleware checks the HTTP headers to ensure the domain issuing the request is the same receiving it for `POST`.

If the request is to be blocked, the server will respond with a [`403`](https://http.cat/403) status.

```ts
export const csrfProtection: RequestMiddleware = (event) => {
	if (csrfBlocker(event) === "block") {
		// eslint-disable-next-line n/no-unsupported-features/node-builtins
		event.nativeEvent.respondWith(new Response(null, { status: 403 }));
		return;
	}
};
```

### Security Headers

This middleware will append multiple HTTP Headers to **every request** hitting the server.

| Header Name                           | Description                                                                                                                                             |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Strict-Transport-Security             | Enforces secure (HTTPS) connections to the server.                                                                                                      |
| X-Frame-Options                       | Prevents [clickjacking](https://owasp.org/www-community/attacks/Clickjacking) by controlling whether a browser can display a page in a frame or iframe. |
| X-Content-Type-Options                | Prevents `MIME` type sniffing by instructing browsers to follow the declared content type.                                                              |
| Referrer-Policy                       | Controls how much referrer information is included with requests.                                                                                       |
| Permissions-Policy                    | Manages permissions for APIs and features in the browser.                                                                                               |
| X-XSS-Protection                      | Fitlers cross-site scripting (XSS) in the browser.                                                                                                      |
| Cross-Origin-Opener-Policy            | Isolates browsing contexts to prevent cross-origin attacks.                                                                                             |
| Cross-Origin-Resource-Policy          | Restricts which origins can load resources.                                                                                                             |
| Access-Control-Allow-Origin           | Specifies which origins can access the resources via cross-origin requests.                                                                             |
| Content-Security-Policy\*             | Defines policies to prevent a wide range of attacks, including XSS and data injection.                                                                  |
| Content-Security-Policy-Report-Only\* | Same as Content-Security-Policy, but does not block, only reports to a passed URI.                                                                      |

<small>
* CSP headers have different defaults if in production or development and these are documented below.
</small>

The default values for each header can be found in [defaults.ts](https://github.com/atilafassina/shieldwall/blob/main/src/lib/defaults.ts#L39-L47) file.
They are strict by default and can be relaxed via configuration

> [!TIP]
> For an extra layer of security, once the Strict-Transport-Security (HSTS) is set, you can register your domain on the [HSTS Preload List](https://hstspreload.org/).

## Content-Security-Policy

Given the complex nature of [Content-Security-Policy (CSP)](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html) header, there is a lot of nuance on how to properly configure it and no _one-size-fits-all_ solution.

> [WARNING]
> Please note that for Hot-Module Replacement to work it's required that we relax them during development to allow for inline-styles and inline-scripts.
> So there are different settings for **development** and **production**.
> We have extensible templates for `dev_hmr_friendly` and `production_basic` to be used in each scenario respectively.

Additionally, CSP allows for [`nonce`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce) hashes to fully secure your application against [XSS](https://owasp.org/www-community/attacks/xss/), it will work out-of-the-box for the header and you must add it on your scripts and stylesheets as [shown on usage](#usage).

### Implementation Tip

It's possible to have 2 CSPs at the same time, so rolling out changes can be done gradually.

```ts
import { createMiddleware } from "@solidjs/start/middleware";
import { csp } from "shieldwall/start";

export default createMiddleware({
	onRequest: [
		csp({
			extend: "production_basic",
			config: {
				withNonce: true,
				reportOnly: true, // warns, doesn't block
			},
		}),
		csp({ extend: "dev_hmr_friendly", config: { withNonce: false } }), // blocks
	],
});
```

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://atila.io/"><img src="https://avatars.githubusercontent.com/u/2382552?v=4?s=100" width="100px;" alt="Atila Fassina"/><br /><sub><b>Atila Fassina</b></sub></a><br /><a href="https://github.com/atilafassina/shieldwall/commits?author=atilafassina" title="Code">💻</a> <a href="#content-atilafassina" title="Content">🖋</a> <a href="https://github.com/atilafassina/shieldwall/commits?author=atilafassina" title="Documentation">📖</a> <a href="#ideas-atilafassina" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-atilafassina" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-atilafassina" title="Maintenance">🚧</a> <a href="#projectManagement-atilafassina" title="Project Management">📆</a> <a href="#tool-atilafassina" title="Tools">🔧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://danieljcafonso.com"><img src="https://avatars.githubusercontent.com/u/35337607?v=4?s=100" width="100px;" alt="Daniel Afonso"/><br /><sub><b>Daniel Afonso</b></sub></a><br /><a href="https://github.com/atilafassina/shieldwall/commits?author=danieljcafonso" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.joshuakgoldberg.com/"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg ✨"/><br /><sub><b>Josh Goldberg ✨</b></sub></a><br /><a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->

<!-- You can remove this notice if you don't want it 🙂 no worries! -->

> 💙 This package was templated with [`create-typescript-app`](https://github.com/JoshuaKGoldberg/create-typescript-app).
