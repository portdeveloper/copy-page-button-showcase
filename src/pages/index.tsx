import {useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const packageManagers = [
  {name: 'npm', command: 'npm install docusaurus-plugin-copy-page-button'},
  {name: 'yarn', command: 'yarn add docusaurus-plugin-copy-page-button'},
  {name: 'pnpm', command: 'pnpm add docusaurus-plugin-copy-page-button'},
  {name: 'bun', command: 'bun add docusaurus-plugin-copy-page-button'},
];

const usedBySites = [
  {site: 'React Native', href: 'https://reactnative.dev', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/3840px-React-icon.svg.png'},
  {site: 'Puppeteer', href: 'https://pptr.dev', logo: 'https://github.com/puppeteer.png'},
  {site: 'pnpm', href: 'https://pnpm.io', logo: 'https://github.com/pnpm.png'},
  {site: 'PlayCanvas', href: 'https://developer.playcanvas.com', logo: 'https://github.com/playcanvas.png'},
  {site: 'Sui', href: 'https://docs.sui.io', logo: 'https://docs.sui.io/img/sui-logo.svg'},
  {site: 'Besu', href: 'https://besu.hyperledger.org', logo: 'https://github.com/hyperledger.png'},
  {site: 'Ethereum execution-apis', href: 'https://ethereum.github.io/execution-apis/', logo: 'https://github.com/ethereum.png'},
  {site: 'Arbitrum', href: 'https://docs.arbitrum.io', logo: 'https://github.com/OffchainLabs.png'},
  {site: 'Cardano', href: 'https://docs.cardano.org', logo: 'https://github.com/cardano-foundation.png'},
  {site: 'Seal', href: 'https://seal-docs.wal.app', logo: 'https://seal-docs.wal.app/img/logo.svg'},
  {site: 'Walrus', href: 'https://docs.wal.app', logo: 'https://docs.wal.app/img/logo.svg'},
  {site: 'SuiNS', href: 'https://docs.suins.io', logo: 'https://docs.suins.io/img/logo.svg'},
  {site: 'Kaia', href: 'https://docs.kaia.io', logo: 'https://github.com/kaiachain.png'},
  {site: 'Chronicle', href: 'https://docs.chroniclelabs.org', logo: 'https://github.com/chronicleprotocol.png'},
  {site: 'FitFileViewer', href: 'https://nick2bad4u.github.io/FitFileViewer/', logo: 'https://github.com/Nick2bad4u.png'},
  {site: 'Uptime Watcher', href: 'https://nick2bad4u.github.io/Uptime-Watcher/', logo: 'https://github.com/Nick2bad4u.png'},
  {site: 'Flare', href: 'https://dev.flare.network', logo: 'https://github.com/flare-foundation.png'},
  {site: 'Hashi', href: 'https://mystenlabs.github.io/hashi/design/', logo: 'https://mystenlabs.github.io/hashi/design/img/logo.svg'},
  {site: 'Nillion', href: 'https://docs.nillion.com', logo: 'https://github.com/NillionNetwork.png'},
  {site: '1claw Docs', href: 'https://docs.1claw.xyz'},
  {site: 'Agent Layer', href: 'https://agent-layer.dev'},
  {site: 'Ai DIY', href: 'https://docs.yiw.me'},
  {site: 'Ovineko', href: 'https://ovineko.com'},
  {site: 'ThunderID', href: 'https://thunderid.dev'},
];

const reviewItems = [
  {
    site: 'Ionic docs',
    href: 'https://github.com/ionic-team/ionic-docs/pull/4499',
    status: 'In review',
    detail: 'Iterating on placement with @brandyscarney; button now lives above the TOC.',
    tone: 'statusReady',
  },
  {
    site: 'Lexical docs',
    href: 'https://github.com/facebook/lexical/pull/8568',
    status: 'In review',
    detail: 'Reviewed by @etrepum (Meta); follow-up debug info shared.',
    tone: 'statusReady',
  },
  {
    site: 'Seeed Studio Wiki',
    href: 'https://github.com/Seeed-Studio/wiki-documents/pull/4682',
    status: 'Pending merge',
    detail: 'Maintainer @nfs0619 confirmed; wiring locale labels before merging.',
    tone: 'statusReady',
  },
  {
    site: 'Ceramic docs',
    href: 'https://github.com/ceramicnetwork/docs-docusaurus/pull/114',
    status: 'Open',
    detail: 'Mergeable and awaiting maintainer review.',
    tone: 'statusReady',
  },
  {
    site: 'Cypress documentation',
    href: 'https://github.com/cypress-io/cypress-documentation/pull/6462',
    status: 'Open',
    detail: 'Open PR awaiting maintainer review.',
    tone: 'statusReady',
  },
  {
    site: 'Dagger docs',
    href: 'https://github.com/dagger/dagger/pull/13045',
    status: 'Open',
    detail: 'Open PR awaiting maintainer review.',
    tone: 'statusReady',
  },
  {
    site: 'Jest docs',
    href: 'https://github.com/jestjs/jest/pull/16179',
    status: 'Open',
    detail: 'Open PR awaiting maintainer review.',
    tone: 'statusReady',
  },
  {
    site: 'Logto docs',
    href: 'https://github.com/logto-io/docs/pull/1400',
    status: 'Open',
    detail: 'Open PR awaiting maintainer review.',
    tone: 'statusReady',
  },
  {
    site: 'Puffer Finance docs',
    href: 'https://github.com/PufferFinance/website-docs/pull/103',
    status: 'Open',
    detail: 'Open PR awaiting maintainer review.',
    tone: 'statusReady',
  },
  {
    site: 'Redux Toolkit docs',
    href: 'https://github.com/reduxjs/redux-toolkit/pull/5299',
    status: 'Open',
    detail: 'Open PR awaiting maintainer review.',
    tone: 'statusReady',
  },
  {
    site: 'SRS docs',
    href: 'https://github.com/ossrs/srs-docs/pull/93',
    status: 'Open',
    detail: 'Open PR awaiting maintainer review.',
    tone: 'statusReady',
  },
  {
    site: 'StreamElements docs',
    href: 'https://github.com/StreamElements/docs/pull/86',
    status: 'Open',
    detail: 'Open PR awaiting maintainer review.',
    tone: 'statusReady',
  },
  {
    site: 'tRPC docs',
    href: 'https://github.com/trpc/trpc/pull/7379',
    status: 'Open',
    detail: 'Open PR awaiting maintainer review.',
    tone: 'statusReady',
  },
  {
    site: 'Uniswap docs',
    href: 'https://github.com/Uniswap/docs/pull/1132',
    status: 'Open',
    detail: 'Open PR awaiting maintainer review.',
    tone: 'statusReady',
  },
];

function InstallCommand() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(packageManagers[active].command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.installBlock}>
      <div className={styles.tabs}>
        {packageManagers.map((pm, i) => (
          <button
            key={pm.name}
            className={clsx(styles.tab, i === active && styles.tabActive)}
            onClick={() => setActive(i)}>
            {pm.name}
          </button>
        ))}
      </div>
      <div className={styles.installRow}>
        <code className={styles.installCode}>
          {packageManagers[active].command}
        </code>
        <button className={styles.copyButton} onClick={handleCopy} title="Copy to clipboard">
          {copied ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

function AdoptionSection() {
  return (
    <section className={styles.adoptionSection}>
      <div className={styles.sectionHeader}>
        <Heading as="h2">Used by docs teams</Heading>
        <p>
          Production documentation sites using this plugin to make pages easier
          to copy, inspect, and open in AI tools.
        </p>
      </div>
      <div className={styles.usedByList}>
        {usedBySites.map((item) => (
          <Link key={item.href} className={styles.usedByLink} href={item.href}>
            {item.logo && (
              <img
                className={styles.usedByLogo}
                src={item.logo}
                alt=""
                loading="lazy"
                width={20}
                height={20}
              />
            )}
            {item.site}
          </Link>
        ))}
      </div>
      <div className={styles.reviewHeader}>
        <Heading as="h3">In review</Heading>
        <p>Recent PRs adding the plugin, last checked on May 21, 2026.</p>
      </div>
      <div className={styles.adoptionGrid}>
        {reviewItems.map((item) => (
          <Link
            key={item.href}
            className={styles.adoptionItem}
            href={item.href}>
            <span className={clsx(styles.status, styles[item.tone])}>
              {item.status}
            </span>
            <strong>{item.site}</strong>
            <span>{item.detail}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <InstallCommand />
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            href="https://github.com/portdeveloper/docusaurus-plugin-copy-page-button">
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Copy Page Button for Docusaurus"
      description="A Docusaurus plugin that adds a copy page button to extract documentation content as markdown for AI tools">
      <HomepageHeader />
      <main className="container" style={{padding: '3rem 0'}}>
        <div className="row">
          <div className="col col--4">
            <Heading as="h3">Zero Config</Heading>
            <p>Add one line to your Docusaurus config and the copy button appears automatically in the sidebar.</p>
          </div>
          <div className="col col--4">
            <Heading as="h3">AI-Ready Markdown</Heading>
            <p>Extracts clean markdown from your docs — perfect for pasting into ChatGPT, Claude, Gemini, or any LLM.</p>
          </div>
          <div className="col col--4">
            <Heading as="h3">Open in AI Tools</Heading>
            <p>One-click buttons to open your docs directly in ChatGPT, Claude, or Gemini with a pre-filled prompt.</p>
          </div>
        </div>
        <div className="row" style={{marginTop: '2rem'}}>
          <div className="col col--4">
            <Heading as="h3">Customizable</Heading>
            <p>Custom styles, configurable actions, and flexible positioning. Show only the actions you need.</p>
          </div>
          <div className="col col--4">
            <Heading as="h3">Theme-Aware</Heading>
            <p>Automatically adapts to light and dark themes. Looks native on any Docusaurus site.</p>
          </div>
          <div className="col col--4">
            <Heading as="h3">Mobile-Friendly</Heading>
            <p>Responsive design that works on desktop, tablet, and mobile with smart fallback positioning.</p>
          </div>
        </div>
        <AdoptionSection />
      </main>
    </Layout>
  );
}
