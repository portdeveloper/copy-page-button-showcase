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

That's it! The copy button will automatically appear in the table of contents sidebar on every docs page. On smaller screens, or on pages without a table of contents, it moves into the article column so it remains visible.

## Try It Now

You can see the copy button in action on this very page. Look for the **Copy page** button in the sidebar on the right. Click it to see the dropdown with all available actions:

- **Copy page** — Copies the page as clean markdown to your clipboard
- **View as Markdown** — Opens the extracted markdown in a new tab
- **Open in ChatGPT** — Sends the page to ChatGPT with a pre-filled prompt
- **Open in Claude** — Sends the page to Claude with a pre-filled prompt
- **Open in Perplexity** — Sends the page to Perplexity with a pre-filled prompt
- **Open in Gemini** — Sends the page to Gemini with a pre-filled prompt
