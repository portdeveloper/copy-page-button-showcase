---
sidebar_position: 3
title: Markdown URL routes
---

# Markdown URL routes

Enable `generateMarkdownRoutes: true` and the plugin emits a plain-markdown URL for every documentation page at build time.

```js title="docusaurus.config.js"
module.exports = {
  plugins: [
    [
      'docusaurus-plugin-copy-page-button',
      {
        generateMarkdownRoutes: true,
      },
    ],
  ],
};
```

## What it produces

For each page Docusaurus renders at `build/<path>/index.html`, the plugin also writes `build/<path>.md` containing the extracted markdown. Your static host serves it at the matching URL.

Example: a page rendered at `https://your-docs.com/getting-started/` is also reachable at `https://your-docs.com/getting-started.md`.

Try it on these adopters (all have `generateMarkdownRoutes` enabled):

- https://docs.sui.io/guides/developer/getting-started.md
- https://pptr.dev/api/puppeteer.page.md
- https://docs.kaia.io/build/get-started/getting-started.md

## Why it matters

- **Reliable AI ingestion.** Sharing `https://docs.example.com/page.md` with an AI tool is more reliable than asking it to scrape HTML — the markdown is clean, the URL is short, and the AI doesn't have to render JS.
- **Linkable context.** Readers can paste the `.md` URL into their AI of choice once instead of copy-pasting every time.
- **AI-action upgrade.** When `generateMarkdownRoutes` is on, the **Open in ChatGPT / Claude / Perplexity / Gemini** buttons in the dropdown automatically point at the `.md` URL instead of the page content. Smaller prompts, cleaner context.

## Output paths

| Source page | Generated markdown |
|---|---|
| `/` (homepage) | `/index.md` |
| `/guides/install/` | `/guides/install.md` |
| `/api/foo.html` | `/api/foo.md` |

## Caveats

- **Only static-built pages get a `.md` URL.** Routes generated dynamically at runtime (e.g., custom plugins that render via React Router only) won't appear.
- **Build time grows slightly** since every page is also serialized to markdown — usually 5–10% on large sites.
- **Pages without article-style content** (custom landing pages, demo iframes) may produce empty `.md` files. The plugin skips writing the file if the extracted markdown is whitespace-only.

## Disable for specific pages

There's no per-page opt-out today. If you need to exclude pages from `.md` generation, file an issue at [portdeveloper/docusaurus-plugin-copy-page-button](https://github.com/portdeveloper/docusaurus-plugin-copy-page-button/issues).
