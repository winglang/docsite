import React from 'react';
import {
    ArrowPathIcon,
    CloudArrowUpIcon,
    Cog6ToothIcon,
    FingerPrintIcon,
    LockClosedIcon,
    ServerIcon,
    CubeIcon,
    GlobeAmericasIcon,
    CheckCircleIcon,
    CommandLineIcon,
    QueueListIcon,
    UserGroupIcon
} from '@heroicons/react/20/solid'

const features = [
    {
        name: 'Developer experience',
        description: 'User-friendly interface to view, explore and interact with your Wing applications running on the local cloud simulator.',
        icon: UserGroupIcon,
    },
    {
        name: 'Interact with resources',
        description: 'Send messages to queues, download files from buckets, make API requests and more.',
        icon: CubeIcon,
    },
    {
        name: 'Create tunnels for APIs',
        description: 'Create secure tunnels to expose your API to the internet for testing and sharing.',
        icon: GlobeAmericasIcon,
    },
    {
        name: 'Running tests',
        description: 'Run tests of your Wing applications and view the results in the Wing Console.',
        icon: CheckCircleIcon,
    },
    {
        name: 'Logs',
        description: 'Debug and view logs of your Wing applications running on the local cloud simulator.',
        icon: QueueListIcon,
    },
    {
        name: 'Wing it',
        description: <span>Get the console up and running with a single command: <code className='dark:bg-wing/40 text-sm -mt-2 -top-[1px] relative'>wing it</code>.</span>,
        icon: CommandLineIcon,
    },
]

export default function Example() {
    return (
        <div className="dark:bg-black py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl sm:text-center">
                    {/* <h2 className="text-xl font-semibold leading-7 text-wing">Bring the cloud to your machine</h2> */}
                    <p className="mt-2 text-3xl font-bold tracking-tight dark:text-white sm:text-7xl">Local simulation</p>
                    <p className="mt-6 text-2xl leading-8 dark:text-gray-300">
                        Simulate and test cloud applications locally before deploying to the cloud.
                    </p>
                </div>
            </div>
            <div className="relative overflow-hidden pt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <img
                        alt="App screenshot"
                        src="/img/simulator2.jpg"
                        width={2432}
                        // height={842}
                        className="mb-[-2%] rounded-xl shadow-2xl ring-4 ring-wing/35"
                    />
                    <div aria-hidden="true" className="relative">
                        <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t dark:from-black from-gray-50/50 pt-[7%]" />
                    </div>
                </div>
            </div>
            <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
                <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 dark:text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
                    {features.map((feature) => (
                        <div key={feature.name} className="relative pl-9">
                            <dt className="inline font-semibold dark:text-white">
                                <feature.icon aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-wing" />
                                {feature.name}
                            </dt>{' '}
                            <dd className="inline ml-0">{feature.description}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}
