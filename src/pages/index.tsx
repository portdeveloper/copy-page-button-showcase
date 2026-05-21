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
  {site: 'Ethereum execution-apis', href: 'https://ethereum.github.io/execution-apis/'},
  {site: 'Sui', href: 'https://docs.sui.io'},
  {site: 'Walrus', href: 'https://docs.wal.app'},
  {site: 'Seal', href: 'https://seal-docs.wal.app'},
  {site: 'SuiNS', href: 'https://docs.suins.io'},
  {site: 'Monad', href: 'https://docs.monad.xyz'},
  {site: 'Flare', href: 'https://dev.flare.network'},
  {site: 'Kaia', href: 'https://docs.kaia.io'},
  {site: 'Nillion', href: 'https://docs.nillion.com'},
  {site: 'Chronicle', href: 'https://docs.chroniclelabs.org'},
  {site: 'Cardano', href: 'https://docs.cardano.org'},
  {site: 'Arbitrum', href: 'https://docs.arbitrum.io'},
  {site: 'Puppeteer', href: 'https://pptr.dev'},
];

const reviewItems = [
  {
    site: 'Oasis Protocol docs',
    href: 'https://github.com/oasisprotocol/docs/pull/1736',
    status: 'Open',
    detail: 'Mergeable with a passing Netlify deploy preview.',
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
    status: 'Needs CLA',
    detail: 'CircleCI passed; CLA assistant is still pending.',
    tone: 'statusBlocked',
  },
  {
    site: 'pnpm docs',
    href: 'https://github.com/pnpm/pnpm.io/pull/806',
    status: 'Needs deploy auth',
    detail: 'CodeRabbit approved; Vercel needs team authorization.',
    tone: 'statusBlocked',
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
