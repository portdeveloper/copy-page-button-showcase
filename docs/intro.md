# Getting Started

URL: https://portdeveloper.github.io/copy-page-button-showcase/docs/intro

Install the plugin in your Docusaurus project:

```bash
npm install docusaurus-plugin-copy-page-button
```

Then add it to your `docusaurus.config.js` :

```js
module.exports = {
  plugins: ['docusaurus-plugin-copy-page-button'],
};
```

That's it. The copy button automatically appears in the table-of-contents sidebar on every docs page. On narrow screens or pages without a table of contents, it falls back to the top of the article column.

## Try It Now

You can see the button in action on this very page — look for the **Copy page** button in the right sidebar. The dropdown offers:

- **Copy page** — copies the page as clean markdown to your clipboard
- **View as Markdown** — opens the extracted markdown in a new tab
- **Open in ChatGPT** — sends the page to ChatGPT with a pre-filled prompt
- **Open in Claude** — sends the page to Claude with a pre-filled prompt
- **Open in Perplexity** — sends the page to Perplexity with a pre-filled prompt
- **Open in Gemini** — sends the page to Gemini with a pre-filled prompt

## Requirements

- **Docusaurus 3.0+** — listed as a peer dependency. The plugin uses APIs introduced in Docusaurus 3 ( `Translate` , `@theme-original` -style swizzling).
- **React 18 or 19** — peer dependency `^18.0.0 || ^19.0.0` .
- **Node 18+** for the build toolchain.
If you're still on Docusaurus 2.x, the plugin won't load. Upgrade your site first using the [official Docusaurus 3 migration guide](https://docusaurus.io/docs/migration/v3) .

## Upgrading

### 0.6.x → 0.7.x

`0.7.0` adds full localization support ( `labels` plugin option + Docusaurus `<Translate>` integration). The change is **backward-compatible** — default English text is unchanged.

If you want to translate the labels, see the [Localization](/copy-page-button-showcase/docs/localization) guide. Otherwise, just bump the version:

```bash
npm install docusaurus-plugin-copy-page-button@^0.7.0
```

No config changes required.

### 0.5.x → 0.6.x

`0.6.0` added Perplexity as a default AI action and introduced MCP server actions. If you pinned `enabledActions` to an explicit list, add `'perplexity'` if you want it visible:

```js
enabledActions: ['copy', 'view', 'chatgpt', 'claude', 'perplexity', 'gemini']
```

## Troubleshooting

### The button doesn't appear

Most common causes, in order:

1. **You're not on a doc page.** Auto-injection only targets pages rendered by `@docusaurus/plugin-content-docs` . The homepage ( `src/pages/index.tsx` ) and other custom pages don't get the button by default — use the [Swizzled placement](/copy-page-button-showcase/docs/recipes/swizzled-placement) recipe to put it on custom pages.
2. **The sidebar/TOC selectors didn't match.** Heavily themed sites can move the TOC into a non-standard DOM location. Set `placement: 'article'` to render the button at the top of the article column instead, or render the React component manually.
3. **You set `injectButton: false` but didn't render the component.** Auto-injection is required unless you're manually rendering. Set it back to the default ( `true` ) or follow [Swizzled placement](/copy-page-button-showcase/docs/recipes/swizzled-placement) .
4. **You're testing in a `<noscript>` snapshot.** The button is React-rendered on the client; it doesn't appear in raw server-side HTML. Open the page in a browser, not via `curl` .

### The dropdown opens in the wrong position

Versions `0.6.1` and `0.6.2` fixed positioning regressions. Make sure you're on `^0.6.2` or newer:

```bash
npm install docusaurus-plugin-copy-page-button@latest
```

### "Open in ChatGPT/Claude/etc." does nothing

The AI deep-links call `window.open(url, '_blank')` . If clicking does nothing:

1. **Pop-up blocker.** Check the browser's address bar for a "pop-up blocked" indicator. Most browsers allow pop-ups when the click is a direct user gesture, but some extensions override this.
2. **CSP `frame-src` blocking external origins.** If your site sets a strict Content-Security-Policy, the new tab might be silently blocked.
3. **Sandbox attributes on the page's `<iframe>` .** If your docs page is embedded in an iframe without `allow-popups` , `window.open` fails silently.
A quick test: open the browser DevTools Console and click the failing action. The plugin currently swallows errors silently — if you see no console output but no new tab either, the cause is almost certainly the browser refusing the popup.

### `Copy page` works but `View as Markdown` doesn't

`View as Markdown` creates a `Blob` URL and opens it. Some sandboxed environments (corporate browsers, certain iframes) block `blob:` URLs. Workaround: set [`generateMarkdownRoutes: true`](/copy-page-button-showcase/docs/recipes/markdown-routes) so the markdown is served from a real URL instead of a blob.

### The labels are still in English on my translated locale

Two things to verify:

1. You're using a **non-default** locale. Docusaurus's `<Translate>` only swaps strings when the active locale differs from `defaultLocale` . If you set `defaultLocale: 'ja'` , English labels won't appear regardless of `code.json` overrides.
2. Your `i18n/<locale>/code.json` has the plugin's IDs. `docusaurus write-translations` does **not** extract them from `node_modules` — you have to add them manually. See the [Localization](/copy-page-button-showcase/docs/localization) page for the full ID table.

## Where next

- [Configuration](/copy-page-button-showcase/docs/configuration) — every option in one place
- [Localization](/copy-page-button-showcase/docs/localization) — translate the button labels
- [Recipes](/copy-page-button-showcase/docs/recipes/private-docs) — copy-paste examples for common setups
- [How It Works](/copy-page-button-showcase/docs/how-it-works) — the markdown extractor + AI deep-link mechanics
