---
sidebar_position: 2
title: Configuration
---

# Configuration

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

| Action | Description |
|--------|-------------|
| `copy` | Copy page as Markdown |
| `view` | View as Markdown in new tab |
| `chatgpt` | Open in ChatGPT |
| `claude` | Open in Claude |
| `gemini` | Open in Gemini |

**Default:** All actions are enabled: `['copy', 'view', 'chatgpt', 'claude', 'gemini']`

### Example Configurations

```js
// Only copy functionality
enabledActions: ['copy']

// Copy and view only (no AI tools)
enabledActions: ['copy', 'view']

// Only AI tools
enabledActions: ['chatgpt', 'claude', 'gemini']
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

| Target | Description |
|--------|-------------|
| `button` | The main copy page button |
| `dropdown` | The dropdown menu |
| `dropdownItem` | Individual items in the dropdown |
| `container` | The wrapper container around the button |

Each target accepts `className` (string) and `style` (React style object).

> **Note**: Positioning styles (`position`, `top`, `right`, `bottom`, `left`, `zIndex`, `transform`) on the `button` are automatically applied to the container.
