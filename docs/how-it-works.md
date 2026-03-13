---
sidebar_position: 3
title: How It Works
---

# How It Works

## Content Extraction

The plugin intelligently extracts page content through several steps:

1. **Smart Content Selection** — Automatically identifies the main documentation content area (`main article` or `main .markdown`)
2. **Clean Extraction** — Removes navigation, sidebars, headers, footers, buttons, and other UI elements
3. **Markdown Conversion** — Converts HTML to properly formatted markdown with preserved structure
4. **AI-Optimized Format** — Includes page title, URL, and clean content

## What Gets Extracted

The conversion handles all common documentation elements:

- **Headings** (h1-h6) with proper `#` syntax
- **Code blocks** with language detection and syntax preservation
- **Inline code** with backtick formatting
- **Tables** with proper markdown table syntax
- **Lists** (ordered and unordered)
- **Links** with `[text](url)` format
- **Images** with `![alt](src)` format
- **Blockquotes** and admonitions
- **Bold** and *italic* text

## Example Output

When you click "Copy page" on a documentation page, you get clean markdown like this:

```markdown
# Page Title

URL: https://your-site.com/docs/page

Your documentation content here, with all formatting
preserved as clean markdown...

## Section Heading

- List items preserved
- Links converted to [markdown](https://example.com)

Code blocks with language detection:
```

## Injection Strategy

The plugin uses a multi-tier injection system:

1. **Fast injection** — For SPA navigation when the sidebar is already in the DOM
2. **Reliable injection** — For page refreshes with retry logic (up to 3 seconds)
3. **Fallback injection** — For pages without a table of contents, positions in the article area

The button automatically adapts to route changes, window resizes, and mobile/desktop layout transitions.
