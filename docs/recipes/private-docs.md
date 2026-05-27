---
sidebar_position: 1
title: Private docs (no AI links)
---

# Private docs (no AI links)

If your documentation is internal-only or otherwise unreachable from the public internet, the **Open in ChatGPT / Claude / Perplexity / Gemini** actions won't work — those services can't fetch your URLs.

Disable the AI actions and keep only the local-only ones (copy and view) with `enabledActions`:

```js title="docusaurus.config.js"
module.exports = {
  plugins: [
    [
      'docusaurus-plugin-copy-page-button',
      {
        enabledActions: ['copy', 'view'],
      },
    ],
  ],
};
```

The dropdown now shows just:

- **Copy page** — copy markdown to clipboard
- **View as Markdown** — open the extracted markdown in a new tab

Users can paste the markdown into whatever LLM they're using on their own machine.

## Adding only specific AI tools

If only some AI tools work for your users (e.g., your team uses Claude but not Gemini), enable a subset:

```js
enabledActions: ['copy', 'view', 'claude']
```

The dropdown will show three items in the listed order.

## Reference

Full list of action IDs is in the [Configuration](../configuration#available-actions) page.
