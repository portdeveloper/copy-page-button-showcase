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
      </main>
    </Layout>
  );
}
