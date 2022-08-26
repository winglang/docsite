import React from 'react';
import clsx from 'clsx';
// @ts-ignore
import styles from './styles.module.scss';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  direction?: 'left' | 'right';
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Designed for Developers',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Wing is built with developers in mind to provide the best experience for building cloud applications. A three
        pronged attack of the WingLang, WingSDK, and Wing Console provides a complete solution that allows cloud developers
        to be their most productive.
      </>
    ),
  },
  {
    title: 'Cloud Agnostic',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Good design says you should delay implementation details as long as possible. With traditional cloud development
        you have to pick your cloud provider first, choosing your implementation before you've design anything. With
        Wing
        you get back to designing your solution before writing it.

        Design first, build next, choose your cloud provider last. Get back to good system design.
      </>
    ),
  },
  {
    title: 'Wing',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        The Wing language, or Wing, is designed to maximize developer productivity. Similar to Typescript and other
        C-style languages, it is easy to learn, yet powerful for building cloud-based applications by treating the cloud
        as a first class citizen, re-integrating infrastructure and application back into one codebase.
      </>
    ),
  },
  {
    title: 'Wing SDK',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        The WingSDK enables developers to focus on the unique logic of their application rather than spending time
        wiring together services.

        Building off the power of the <a href="https://aws.amazon.com/cdk/" target="_blank">CDK</a> and construct-based
        APIs, combined with a standard library for interacting
        with their cloud resources, WingSDK allows developers to return their focus back to the unique problem they need
        to solve.
      </>
    ),
  },
  {
    title: 'Wing Console',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Developing for the cloud has required deploying to the cloud to do testing. This can drastically slow down
        developer productivity as it takes an order of magnitude more time to deploy and test applications in the
        cloud than it does to test locally. The Wing Console provides developers with a fully WingSDK-compliant local
        environment, testing, and monitoring tools for Wing applications. This allows developers to regain the speed
        and productivity that was lost when applications shifted to the cloud.
      </>
    ),
  },
];

function Feature({ title, Svg, description, direction }: FeatureItem) {
  return (
    <div className={clsx(styles.feature, styles[direction])}>
      <div className={clsx(styles.image, "text--center")}>
        <Svg className={styles.featureSvg} role="img"/>
      </div>
      <div className={clsx(styles.text, "text--center")}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} direction={idx % 2 ? 'left' : 'right'} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
