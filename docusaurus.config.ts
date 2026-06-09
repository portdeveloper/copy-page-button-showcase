import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'docusaurus-copy-page-button',
  tagline: 'A Docusaurus plugin that lets users copy documentation pages as markdown for AI tools',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://portdeveloper.github.io',
  baseUrl: '/copy-page-button-showcase/',

  organizationName: 'portdeveloper',
  projectName: 'copy-page-button-showcase',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      'docusaurus-plugin-copy-page-button',
      {
        generateMarkdownRoutes: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      // First-time visitors get their OS theme. The 3-state system/light/dark
      // cycle this would normally enable (which made the first click only swap
      // the icon) is overridden to a 2-state toggle in the swizzled
      // src/theme/Navbar/ColorModeToggle.
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'docusaurus-copy-page-button',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://www.npmjs.com/package/docusaurus-plugin-copy-page-button',
          label: 'npm',
          position: 'right',
        },
        {
          href: 'https://github.com/portdeveloper/docusaurus-plugin-copy-page-button',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Links',
          items: [
            {
              label: 'npm',
              href: 'https://www.npmjs.com/package/docusaurus-plugin-copy-page-button',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/portdeveloper/docusaurus-plugin-copy-page-button',
            },
          ],
        },
      ],
      copyright: `MIT © portdeveloper`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
