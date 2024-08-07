import React from 'react';
import { ArrowPathIcon, CloudArrowUpIcon, LockClosedIcon, CubeIcon, CloudIcon, CodeBracketIcon, ArrowPathRoundedSquareIcon, RectangleGroupIcon, ComputerDesktopIcon } from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Wing Cloud Library',
    description:
      'A library of classes that represent common resources for building cloud applications including Queues, Functions, APIs and more.',
    href: '/docs/api/category/cloud',
    label: 'Explore the Wing Cloud Library',
    icon: CubeIcon,
  },
  {
    name: 'Cross-cloud support',
    description:
      'Deploy your applications to AWS, Azure, or Google Cloud with Wing, which abstracts cloud provider differences, letting you focus on your application.',
    href: '/docs/platforms/platforms',
    label: 'Learn more about Wing platforms',
    icon: CloudIcon,
  },
  {
    name: 'Extensibility',
    description:
      'Wing is built for extensibility, enabling integration with any IaC resources and customization via powerful compiler plugins.',
    href: '/docs/api/language-reference',
    label: 'Explore the language reference',
    icon: CodeBracketIcon,
  },
  {
    name: 'Unify runtime and compile time code',
    description:
      'Wing unifies execution phases with a single programming model using preflight and inflight code concepts.',
    href: '/docs/concepts/inflights',
    label: 'Understand preflight and inflight code',
    icon: ArrowPathRoundedSquareIcon,
  },
  {
    name: 'Develop custom platforms',
    description:
      'Create custom platforms to support unique cloud providers, optimize deployments, or integrate with enterprise systems.',
    href: '/docs/platforms/platforms#custom-platforms',
    label: 'Create a custom platform',
    icon: RectangleGroupIcon,
  },
  {
    name: 'Bring the cloud to your machine',
    description:
      'Enhance your experience with the Wing Console by exploring and interacting with Wing applications on the local cloud simulator.',
    href: '/docs/tools/wing-console',
    label: 'Get started with the Wing Console',
    icon: ComputerDesktopIcon,
  },
]

export default function Features() {
  return (
    <div className="dark:bg-black py-32 py-16  ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:text-center">
          <h2 className="text-xl font-semibold leading-7 text-wing">Code for the cloud</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight dark:text-gray-100 sm:text-5xl">
            Build distributed systems that fully leverage the power of the cloud
          </p>
          <p className="mt-6 text-lg leading-8 dark:text-gray-300">
            Wing gives application developers and platform enigneers the tools they need to build and deploy distributed systems without the need to know all the details of the underlying cloud infrastructure.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 dark:text-gray-100">
                  <feature.icon aria-hidden="true" className="h-5 w-5 flex-none text-wing" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300 ml-0 ">
                  <p className="flex-auto text-gray-800 dark:text-gray-400">{feature.description}</p>
                  <p className="mt-3">
                    <a href={feature.href} className="text-sm font-semibold leading-6 text-teal-700 dark:text-wing">
                      {feature.label} <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
