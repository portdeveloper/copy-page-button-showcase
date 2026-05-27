# Custom styling

URL: https://portdeveloper.github.io/copy-page-button-showcase/docs/recipes/custom-styling

The button ships with sensible defaults that inherit from the Docusaurus theme. When you need it to look exactly a certain way — match a brand color, position absolutely, hide the chevron — use `customStyles` or `className` hooks.

## Style targets

| Target | What it controls 
| `container` | The wrapper `<div>` around the button (positioning lives here) 
| `button` | The visible "Copy page" button itself 
| `dropdown` | The dropdown menu shell 
| `dropdownItem` | Each row inside the dropdown 

Every target accepts:

- `className: string` — append your own CSS class
- `style: React.CSSProperties` — inline styles

## Brand-color button

docusaurus.config.js

```js
plugins: [
  [
    'docusaurus-plugin-copy-page-button',
    {
      customStyles: {
        button: {
          style: {
            backgroundColor: '#4CAF50',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
          },
        },
      },
    },
  ],
],
```

## Fixed-position floating button

The plugin special-cases positioning properties: any `position` / `top` / `right` / `bottom` / `left` / `zIndex` / `transform` you put on the `button` is hoisted to the `container` so the dropdown anchors correctly.

```js
customStyles: {
  button: {
    style: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
    },
  },
},
```

Result: the button floats in the top-right corner of every doc page, and the dropdown still opens directly below it.

## Class-only customization (no inline styles)

If you'd rather keep styling in your CSS files, pass class names:

```js
customStyles: {
  container: { className: 'my-copy-container' },
  button: { className: 'my-copy-button' },
  dropdown: { className: 'my-copy-dropdown' },
  dropdownItem: { className: 'my-copy-dropdown-item' },
}
```

src/css/custom.css

```css
.my-copy-button {
  background: var(--ifm-color-primary);
  color: white;
  border-radius: 999px;
  padding: 0.4rem 0.9rem;
}

.my-copy-button:hover {
  background: var(--ifm-color-primary-dark);
}
```

This is the pattern used by the [Ionic docs PR](https://github.com/ionic-team/ionic-docs/pull/4499) — CSS-Modules classes passed from the swizzled theme component.

## Combining with the React component

When rendering `<CopyPageButton />` directly (see [Swizzled placement](/copy-page-button-showcase/docs/recipes/swizzled-placement) ), the same `customStyles` prop is available:

```tsx
<CopyPageButton
  customStyles={{
    button: { className: styles.copyPageButton },
    dropdown: { className: styles.copyPageDropdown },
  }}
/>
```

## Dark-mode considerations

Use CSS custom properties from the Docusaurus theme so your styles adapt to dark mode automatically:

```js
customStyles: {
  button: {
    style: {
      backgroundColor: 'var(--ifm-color-emphasis-100)',
      color: 'var(--ifm-font-color-base)',
    },
  },
},
```

Hard-coded hex values ( `#fff` , `#333` ) will look wrong in one mode unless you scope them with `[data-theme='dark'] .my-class { ... }` selectors in your CSS.
