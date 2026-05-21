# Configuration

URL: https://portdeveloper.github.io/copy-page-button-showcase/docs/configuration

## Enabled Actions

Control which actions appear in the dropdown menu. This is useful for private documentation sites where AI tool links won't work.

```js
module.exports = {
  plugins: [
    [
      'docusaurus-plugin-copy-page-button',
      {
        // Only show copy and view actions
        enabledActions: ['copy', 'view'],
      },
    ],
  ],
};
```

### Available Actions

| Action | Description 
| `copy` | Copy page as Markdown 
| `view` | View as Markdown in new tab 
| `chatgpt` | Open in ChatGPT 
| `claude` | Open in Claude 
| `perplexity` | Open in Perplexity 
| `gemini` | Open in Gemini 
| `mcp-copy` | Copy MCP server JSON 
| `mcp-cursor` | Install MCP server in Cursor 
| `mcp-vscode` | Install MCP server in VS Code 

**Default:** Standard actions are enabled: `['copy', 'view', 'chatgpt', 'claude', 'perplexity', 'gemini']` . MCP actions are enabled automatically only when `mcpServer` is configured.

### Example Configurations

```js
// Only copy functionality
enabledActions: ['copy']

// Copy and view only (no AI tools)
enabledActions: ['copy', 'view']

// Only AI tools
enabledActions: ['chatgpt', 'claude', 'perplexity', 'gemini']
```

## Placement

By default, the plugin places the button in the table of contents sidebar on desktop and falls back to the article column on mobile or no-TOC pages.

```js
module.exports = {
  plugins: [
    [
      'docusaurus-plugin-copy-page-button',
      {
        placement: 'article',
      },
    ],
  ],
};
```

| Value | Behavior 
| `auto` | Sidebar on desktop when visible, article on mobile/no-TOC pages 
| `toc` | Table of contents only 
| `article` | Top of the article column 

## Manual React Component

Sites that need exact placement can disable automatic injection and render the component from a swizzled Docusaurus theme component:

```js
module.exports = {
  plugins: [
    [
      'docusaurus-plugin-copy-page-button',
      {
        injectButton: false,
        generateMarkdownRoutes: true,
      },
    ],
  ],
};
```

```tsx
import CopyPageButton from 'docusaurus-plugin-copy-page-button/react';

export default function MyDocHeader() {
  return <CopyPageButton generateMarkdownRoutes />;
}
```

## MCP Actions

If your docs expose an MCP server, configure it to add MCP actions to the dropdown:

```js
module.exports = {
  plugins: [
    [
      'docusaurus-plugin-copy-page-button',
      {
        mcpServer: {
          name: 'my-docs',
          url: 'https://docs.example.com/mcp',
        },
      },
    ],
  ],
};
```

## Custom Styling

Customize the appearance of the button and dropdown:

```js
module.exports = {
  plugins: [
    [
      'docusaurus-plugin-copy-page-button',
      {
        customStyles: {
          button: {
            className: 'my-custom-button',
            style: {
              backgroundColor: '#4CAF50',
              color: 'white',
              borderRadius: '8px',
            },
          },
          dropdown: {
            className: 'my-custom-dropdown',
            style: {
              backgroundColor: '#f8f9fa',
              border: '2px solid #4CAF50',
            },
          },
          dropdownItem: {
            style: {
              padding: '12px 20px',
              fontSize: '16px',
            },
          },
          container: {
            className: 'my-button-container',
          },
        },
      },
    ],
  ],
};
```

### Style Targets

| Target | Description 
| `button` | The main copy page button 
| `dropdown` | The dropdown menu 
| `dropdownItem` | Individual items in the dropdown 
| `container` | The wrapper container around the button 

Each target accepts `className` (string) and `style` (React style object).

> **Note** : Positioning styles ( `position` , `top` , `right` , `bottom` , `left` , `zIndex` , `transform` ) on the `button` are automatically applied to the container.
