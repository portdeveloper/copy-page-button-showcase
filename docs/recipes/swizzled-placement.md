---
sidebar_position: 2
title: Swizzled placement (custom location)
---

# Swizzled placement (custom location)

Auto-injection drops the button into the table-of-contents area on desktop. When that doesn't fit your theme — for example you want the button above the "Contents" heading, in a custom header, or alongside an "Edit this page" link — disable injection and render the public React component yourself.

## Disable auto-injection

```js title="docusaurus.config.js"
module.exports = {
  plugins: [
    [
      'docusaurus-plugin-copy-page-button',
      {
        injectButton: false,
      },
    ],
  ],
};
```

The plugin still loads (it ships the React component and the markdown extractor), it just doesn't try to find a DOM target.

## Render the component from a swizzle

The component is exposed at `docusaurus-plugin-copy-page-button/react`. Swizzle the Docusaurus theme component closest to the spot you want — usually `@theme/TOC` or `@theme/DocItem/TOC/Desktop` — and render `<CopyPageButton />` alongside the original content.

### Example: button above the "Contents" heading in the right sidebar

This is the pattern that landed in [ionic-team/ionic-docs#4499](https://github.com/ionic-team/ionic-docs/pull/4499). If you already have a `@theme/TOC` swizzle, drop the component inside its returned JSX:

```tsx title="src/theme/TOC/index.tsx"
import React from 'react';
import TOC from '@theme-original/TOC';
import type { Props } from '@theme/TOC';
import CopyPageButton from 'docusaurus-plugin-copy-page-button/react';

import styles from './styles.module.css';

export default function TOCWrapper(props: Props): JSX.Element {
  return (
    <div className="toc-wrapper">
      <div className={styles.copyPageAction}>
        <CopyPageButton
          customStyles={{
            container: { className: styles.copyPageContainer },
            button: { className: styles.copyPageButton },
            dropdown: { className: styles.copyPageDropdown },
          }}
        />
      </div>
      <h2>Contents</h2>
      <TOC {...props} />
    </div>
  );
}
```

```css title="src/theme/TOC/styles.module.css"
.copyPageAction {
  margin-bottom: 0.5rem;
}

.copyPageContainer {
  display: inline-block;
}

.copyPageButton {
  font-size: 0.85rem;
  padding: 0.25rem 0.6rem;
  gap: 0.35rem;
}
```

### Example: header-area button

If you want the button in the top navbar instead, swizzle `@theme/Navbar/Content` and render `<CopyPageButton />` in your custom slot.

```tsx
import CopyPageButton from 'docusaurus-plugin-copy-page-button/react';

export default function NavbarContent(): JSX.Element {
  return (
    <>
      {/* … original navbar items … */}
      <CopyPageButton />
    </>
  );
}
```

## Mobile fallback

When auto-injection is off, the article-column mobile fallback is also off — you'll need to render the component for both desktop and mobile yourself if you want it to appear on narrow viewports. The Ionic PR keeps a separate `@theme/DocItem/Layout` swizzle that renders the component when the right-sidebar TOC isn't there.

## Props

`<CopyPageButton />` accepts the same `customStyles`, `enabledActions`, `mcpServer`, and `labels` props as the plugin options. See the [react.d.ts](https://github.com/portdeveloper/docusaurus-plugin-copy-page-button/blob/main/react.d.ts) for the full type.
