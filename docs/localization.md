---
sidebar_position: 3
title: Localization
---

# Localization

All visible button labels and descriptions are translatable from version `0.7.0` onward. Two override paths are supported, suited to different site shapes.

## Quick reference — translation IDs

Whichever path you use, the same set of IDs covers every visible string:

| ID | Default English |
|---|---|
| `copyPageButton.button.label` | `Copy page` (the visible button text) |
| `copyPageButton.copy.title` / `.description` | `Copy page` / `Copy the page as Markdown for LLMs` |
| `copyPageButton.view.title` / `.description` | `View as Markdown` / `View this page as plain text` |
| `copyPageButton.chatgpt.title` / `.description` | `Open in ChatGPT` / `Ask questions about this page` |
| `copyPageButton.claude.title` / `.description` | `Open in Claude` / `Ask questions about this page` |
| `copyPageButton.perplexity.title` / `.description` | `Open in Perplexity` / `Ask questions about this page` |
| `copyPageButton.gemini.title` / `.description` | `Open in Gemini` / `Ask questions about this page` |
| `copyPageButton.mcpCopy.title` / `.description` | `Copy MCP config` / `Copy MCP server JSON` |
| `copyPageButton.mcpCursor.title` / `.description` | `Install in Cursor` / `Open Cursor MCP installer` |
| `copyPageButton.mcpVscode.title` / `.description` | `Install in VS Code` / `Open VS Code MCP installer` |

Override only the keys you need — anything you leave out falls back to the default English.

## Option A — `labels` plugin option

Pass overrides directly in `docusaurus.config.js`. This works for **any** Docusaurus site, including monolingual sites and the "one-site-per-language" pattern where each site has its own `defaultLocale`.

```js
module.exports = {
  plugins: [
    [
      'docusaurus-plugin-copy-page-button',
      {
        labels: {
          button: { label: 'ページをコピー' },
          copy: {
            title: 'ページをコピー',
            description: 'このページを Markdown としてコピー',
          },
          view: { title: 'Markdown で表示' },
          chatgpt: { title: 'ChatGPT で開く' },
          claude: { title: 'Claude で開く' },
          perplexity: { title: 'Perplexity で開く' },
          gemini: { title: 'Gemini で開く' },
        },
      },
    ],
  ],
};
```

This is the **only** path that works when each language is its own Docusaurus site (each with its own `defaultLocale`), because Docusaurus's `<Translate>` only swaps strings for non-default locales.

## Option B — Docusaurus i18n via `code.json`

For a single site with multiple locales (`i18n: { defaultLocale, locales }`), every visible label flows through Docusaurus's `translate()`. Add the translation IDs to `i18n/<locale>/code.json` for each non-default locale:

```json title="i18n/ja/code.json"
{
  "copyPageButton.button.label": { "message": "コピー" },
  "copyPageButton.copy.title": { "message": "ページをコピー" },
  "copyPageButton.copy.description": { "message": "このページを Markdown としてコピー" },
  "copyPageButton.view.title": { "message": "Markdown で表示" },
  "copyPageButton.chatgpt.title": { "message": "ChatGPT で開く" },
  "copyPageButton.claude.title": { "message": "Claude で開く" },
  "copyPageButton.perplexity.title": { "message": "Perplexity で開く" },
  "copyPageButton.gemini.title": { "message": "Gemini で開く" }
}
```

After saving, run `docusaurus build` and the translated labels appear when the user is on a non-default locale.

:::note
`docusaurus write-translations` only scans your site's source code, not `node_modules`. The plugin's IDs **won't** be auto-extracted — copy them in manually from the table above.
:::

## Combining both

The `labels` option wins over `code.json` when set. Use `labels` for site-wide overrides (e.g., shorter brand-styled text on every locale) and `code.json` for per-locale translations.

```js
// docusaurus.config.js — applies to every locale
plugins: [
  [
    'docusaurus-plugin-copy-page-button',
    {
      labels: {
        button: { label: 'Get Markdown' }, // English brand override
      },
    },
  ],
],
```

```json title="i18n/ja/code.json"
// Override the brand text *just* for Japanese
{
  "copyPageButton.button.label": { "message": "Markdown を取得" }
}
```

When `labels.button.label` is set, the Japanese override in `code.json` is ignored. If you need per-locale variations, prefer Option B without setting `labels`.
