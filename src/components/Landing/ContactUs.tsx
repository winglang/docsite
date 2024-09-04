import React from 'react';
import ContactForm from './ContactForm';

const items = [
    {
        title: 'Report an issue',
        label: 'Found a bug? Let us know!',
        url: 'https://github.com/winglang/wing/issues/new/choose'
    },
    {
        title: 'Ask the community',
        label: 'Join our discord, and talk to people who have the answers',
        url: 'https://t.winglang.io/discord'
    },
    {
        title: 'Join the conversation',
        label: 'Check out what`s new in our GitHub discussions',
        url: 'https://github.com/winglang/wing'
    }
];

export default function ContactUs() {
    return (
        <div className="relative isolate dark:bg-gray-900">
            <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
                    <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                        <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-white/5 lg:w-1/2">

                            <div
                                aria-hidden="true"
                                className="absolute -left-56 top-[calc(100%-13rem)] transform-gpu blur-3xl lg:left-[max(-14rem,calc(100%-59rem))] lg:top-[calc(50%-7rem)]"
                            >
                                <div
                                    style={{
                                        clipPath:
                                            'polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)',
                                    }}
                                    className="hidden dark:block aspect-[1155/678] w-[72.1875rem] bg-gradient-to-br from-wing/50 to-wing opacity-20"
                                />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight dark:text-white">We want to hear from you!</h2>
                        <p className="mt-6 text-lg leading-8 dark:text-gray-300">
                            Whether you want to contribute or just have a question, let us know and we’ll respond promptly.
                        </p>
                        <ul className='m-0 p-0 space-y-4'>
                            {items.map((item) => {
                                return <a href={item.url} className='block p-4 bg-gray-100 dark:bg-gray-800/80 rounded-md space-y-2 hover:bg-wing/20 group'>
                                    <span className='block text-xl font-bold text-black dark:text-wing group:hover:no-underline!'>{item.title}</span>
                                    <span className='block text-md dark:text-gray-200 group:hover:no-underline!'>{item.label}</span>
                                </a>
                            })}
                        </ul>
                    </div>
                </div>
                <div className="px-6 pb-24 pt-20 sm:pb-32 lg:px-20 lg:py-48">
                    <ContactForm />
                </div>
              
            </div>
        </div>
    )
}
