import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Designed for Developers',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Wing is built from day one with developers in mind with the goal of providing the best developer experience
        possible for building cloud applications. A three pronged attack of the WingLang, WingSDK, and WingCLI
        provides a complete solution that allows developers to be their most productive.
      </>
    ),
  },
  {
    title: 'Cloud Agnostic',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Good software design says to delay implementation details as last as possible. Design first your solution and
        implement later. With the current state of the cloud, developers are required to choose their cloud provider
        first, breaking this tenant and requiring implementation details to drive design.

        Build your application using common cloud components and then decide which cloud, or all of the clouds, to
        deploy to. Building off the years of experience with the Cloud Development Kit (CDK), Wing allows developers
        to design their application first without having to choose specific implementation details like which public
        cloud environment they're targeting. After the application is designed, built, and ready for testing you can
        then choose which
      </>
    ),
  },
  {
    title: 'WingLang',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        The Wing language, or WingLang, was designed to maximize developer productivity. Similar to Typescript and other
        C-style languages it is easy to learn, yet powerful for building cloud-based applications by treating the cloud
        as a first class citizen, re-integrating infrastructure and application back into one codebase.
      </>
    ),
  },
  {
    title: 'WingSDK',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        All applications work off of the same basic resources, like HTTP endpoints, functions, queues, key-value stores,
        databases, and other basic primitives. The WingSDK enables developers to focus on the unique logic
        of their application rather than having to worry about which specific API they want to work with or building
        complex hexagonal architectures to support multiple cloud environments or writing "glue" code to wire all their
        resources together.

        Building off the power of the CDK and construct-based APIs, combined with a standard library for interacting
        with their cloud resources, WingSDK allows developers to return their focus back to the unique problem they need
        to solve.

      </>
    ),
  },
  {
    title: 'WingCLI',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Developing for the cloud often requires deploying to the cloud to do testing. This can drastically slow down
        developer productivity as it takes an order of magnitude more time to deploy and test applications in the
        cloud than it does to test locally. The WingCLI provides developers with a fully WingSDK-compliant local
        environment, testing, and monitoring tools for Wing applications. This allows developers to regain the speed
        and productivity that was lost when applications shifted to cloud architectures.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img"/>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
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
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
