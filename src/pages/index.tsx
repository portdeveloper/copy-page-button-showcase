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
  {site: 'Seeed Studio Wiki', href: 'https://wiki.seeedstudio.com', logo: 'https://github.com/Seeed-Studio.png'},
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
  {site: 'Redux Toolkit', href: 'https://redux-toolkit.js.org'},
  {site: 'Ionic', href: 'https://ionicframework.com/docs', logo: 'https://github.com/ionic-team.png'},
  {site: 'Stryker', href: 'https://stryker-mutator.io', logo: 'https://github.com/stryker-mutator.png'},
];

const features = [
  {
    icon: '⚡',
    title: 'Zero Config',
    desc: 'Add one line to your Docusaurus config and the copy button appears automatically in the sidebar.',
  },
  {
    icon: '🤖',
    title: 'AI-Ready Markdown',
    desc: 'Extracts clean markdown from your docs — perfect for pasting into ChatGPT, Claude, Gemini, or any LLM.',
  },
  {
    icon: '🔗',
    title: 'Open in AI Tools',
    desc: 'One-click buttons to open your docs directly in ChatGPT, Claude, or Gemini with a pre-filled prompt.',
  },
  {
    icon: '🎨',
    title: 'Customizable',
    desc: 'Custom styles, configurable actions, and flexible positioning. Show only the actions you need.',
  },
  {
    icon: '🌓',
    title: 'Theme-Aware',
    desc: 'Automatically adapts to light and dark themes. Looks native on any Docusaurus site.',
  },
  {
    icon: '📱',
    title: 'Mobile-Friendly',
    desc: 'Responsive design that works on desktop, tablet, and mobile with smart fallback positioning.',
  },
];

const reviewItems = [
  {
    site: 'Cypress documentation',
    href: 'https://github.com/cypress-io/cypress-documentation/pull/6462',
    status: 'In review',
    detail: 'Maintainer reviewed; requested changes pushed, awaiting re-review.',
    tone: 'statusReady',
  },
  {
    site: 'Uniswap docs',
    href: 'https://github.com/Uniswap/docs/pull/1132',
    status: 'Open',
    detail: 'Open PR; checks green, awaiting maintainer review.',
    tone: 'statusReady',
  },
  {
    site: 'BandChain docs',
    href: 'https://github.com/bandprotocol/bandchain-docs/pull/93',
    status: 'Open',
    detail: 'Open PR awaiting maintainer review.',
    tone: 'statusReady',
  },
  {
    site: 'Capacitor docs',
    href: 'https://github.com/ionic-team/capacitor-docs/pull/556',
    status: 'Open',
    detail: "Ionic's Capacitor docs — open PR awaiting review.",
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

function UsedByMarquee() {
  // Duplicate the list so the track can loop seamlessly; the second copy is
  // hidden from assistive tech and keyboard focus.
  const track = [...usedBySites, ...usedBySites];
  return (
    <section className={styles.marqueeSection} aria-label="Used by docs teams">
      <p className={styles.marqueeLabel}>Used by docs teams</p>
      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {track.map((item, i) => {
            const isClone = i >= usedBySites.length;
            return (
              <Link
                key={`${item.href}-${i}`}
                className={styles.marqueeItem}
                href={item.href}
                aria-hidden={isClone || undefined}
                tabIndex={isClone ? -1 : undefined}>
                {item.logo && (
                  <img
                    className={styles.marqueeLogo}
                    src={item.logo}
                    alt=""
                    loading="lazy"
                    width={22}
                    height={22}
                  />
                )}
                <span>{item.site}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AdoptionSection() {
  return (
    <section className={styles.adoptionSection}>
      <div className={styles.reviewHeader}>
        <Heading as="h3">In review</Heading>
        <p>Recent PRs adding the plugin, last checked on June 9, 2026.</p>
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

function Features() {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.featureGrid}>
        {features.map((feature) => (
          <div key={feature.title} className={styles.featureCard}>
            <span className={styles.featureIcon} aria-hidden="true">
              {feature.icon}
            </span>
            <Heading as="h3">{feature.title}</Heading>
            <p>{feature.desc}</p>
          </div>
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
      <UsedByMarquee />
      <main className="container" style={{padding: '3rem 0'}}>
        <Features />
        <AdoptionSection />
      </main>
    </Layout>
  );
}
