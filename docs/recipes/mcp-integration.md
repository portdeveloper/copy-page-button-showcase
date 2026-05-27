---
sidebar_position: 4
title: MCP server integration
---

# MCP server integration

If your documentation site exposes a [Model Context Protocol](https://modelcontextprotocol.io/) server (or you want to point readers at one you maintain), the plugin can add MCP-related actions to the dropdown:

- **Copy MCP config** — copies the MCP server JSON to the clipboard so users can paste it into Claude Desktop, Cursor, or another MCP client
- **Install in Cursor** — opens the [Cursor MCP install deeplink](https://docs.cursor.com/context/model-context-protocol)
- **Install in VS Code** — opens the `vscode:mcp/install` deeplink

## URL-only servers

If your MCP server is HTTPS-accessible at a stable URL, pass the URL directly. The plugin uses `docs` as the default server name:

```js title="docusaurus.config.js"
module.exports = {
  plugins: [
    [
      'docusaurus-plugin-copy-page-button',
      {
        mcpServer: 'https://docs.example.com/mcp',
      },
    ],
  ],
};
```

The dropdown gains three new entries with the install deeplinks pre-built.

## Full config form

Pass an object to specify a custom name or other fields:

```js
mcpServer: {
  name: 'my-docs',
  url: 'https://docs.example.com/mcp',
}
```

For command-based servers (e.g., stdio):

```js
mcpServer: {
  name: 'my-docs',
  command: 'npx',
  args: ['-y', 'my-docs-mcp-server'],
  env: {
    DOCS_API_KEY: 'set-by-user',
  },
}
```

The JSON copied to the clipboard mirrors the [Claude Desktop config format](https://modelcontextprotocol.io/quickstart/user) — paste it into `claude_desktop_config.json` under `mcpServers`.

## Showing only specific MCP actions

Combine `mcpServer` with `enabledActions` to control which MCP options appear:

```js
{
  mcpServer: 'https://docs.example.com/mcp',
  enabledActions: ['copy', 'view', 'chatgpt', 'mcp-copy'],
  // 'mcp-cursor' and 'mcp-vscode' are omitted
}
```

## What gets rendered

When `mcpServer` is set, the dropdown grows from 6 default actions to up to 9:

```
Copy page
View as Markdown
Open in ChatGPT
Open in Claude
Open in Perplexity
Open in Gemini
─────────────────
Copy MCP config
Install in Cursor
Install in VS Code
```

## Localizing the MCP labels

The MCP entries are translatable via the same i18n IDs documented in [Localization](../localization):

```js
labels: {
  mcpCopy: { title: 'MCP 設定をコピー' },
  mcpCursor: { title: 'Cursor にインストール' },
  mcpVscode: { title: 'VS Code にインストール' },
}
```
