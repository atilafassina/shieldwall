<h1 align="center">ShieldWall</h1>

<p align="center">Security for your Fullstack App 🛡️</p>

## Install

```sh
pnpm add shieldwall
```

## Usage

This package aims to support every framework runtime powered by [h3](https://h3.unjs.io), but at this moment only [SolidStart](https://start.solidjs.com) has first-class adapters.

### SolidStart

The exports are out-of-the-box middleware handlers. If you need help creating middlewares in SolidStart you can [check the docs](https://docs.solidjs.com/solid-start/advanced/middleware)

```ts
import { createMiddleware } from "@solidjs/start/middleware";
import { csrfProtection, secureRequest } from "shieldwall/start";

export default createMiddleware({
	onRequest: [csrfProtection, secureRequest()],
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

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://atila.io/"><img src="https://avatars.githubusercontent.com/u/2382552?v=4?s=100" width="100px;" alt="Atila Fassina"/><br /><sub><b>Atila Fassina</b></sub></a><br /><a href="https://github.com/atilafassina/shieldwall/commits?author=atilafassina" title="Code">💻</a> <a href="#content-atilafassina" title="Content">🖋</a> <a href="https://github.com/atilafassina/shieldwall/commits?author=atilafassina" title="Documentation">📖</a> <a href="#ideas-atilafassina" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-atilafassina" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-atilafassina" title="Maintenance">🚧</a> <a href="#projectManagement-atilafassina" title="Project Management">📆</a> <a href="#tool-atilafassina" title="Tools">🔧</a></td>
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
