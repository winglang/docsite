import React from 'react';
import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';
import { RequireAuth } from "@site/src/theme/RequireAuth";

let tagline = 'A purpose-built development experience for cloud based applications';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Wing</h1>
        <p className="hero__subtitle">{tagline}</p>
        <div className={styles.buttons}>
          <CodeBlock>
            $ npm install -g @monadahq/wing
          </CodeBlock>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <RequireAuth>
      <Layout
        title={`${siteConfig.title}`}
        description={tagline}>
        <HomepageHeader/>
        <main>
          <HomepageFeatures/>
        </main>
      </Layout>
    </RequireAuth>
  );
}
