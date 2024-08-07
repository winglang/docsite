import React from 'react'

const featuredPost = {
    id: 1,
    title: 'If Dev and Ops Had a Baby — It Would Be Called Winglang',
    href: 'https://thenewstack.io/if-dev-and-ops-had-a-baby-it-would-be-called-winglang/',
    description:
        'Winglang takes a batteries-included approach, which means that the toolchain is shipped with everything a developer would need, such as a testing framework, an IDE extension, a compiler and a cloud simulator. It’s a one-stop shop. Wing interoperates naturally with any NPM module and with JavaScript and TypeScript code; we decided to have Winglang compile to JavaScript because it’s the biggest ecosystem on the planet and is very popular in cloud development...',
    date: 'Apr 05, 2024',
    datetime: '2024-04-05',
    author: {
        name: 'Elad Ben-Israel',
        href: '',
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
}
const posts = [
    {
        id: 2,
        title: 'Top 5 Startups to Watch for Enterprise Architects',
        href: 'https://www.techtimes.com/articles/303243/20240403/top-5-startups-watch-enterprise-architects.htm',
        description:
            'Wing launched out of stealth with $20 Million in funding from big-name investors last year. They have a well-decorated founder, Elad Ben-Israel (CEO), who is the creator of the AWS Cloud Development Kit (CDK) and other popular open-source projects in the infrastructure space and who has recently been recognized as one of the most innovative CEOs in 2024...',
        date: 'Apr 03, 2024',
        datetime: '2024-04-13',
        author: {
            name: 'Eryka S',
            href: '#'
        },
    },
    {
        id: 3,
        title: 'Thoughtworks Technology Radar',
        href: 'https://www.thoughtworks.com/radar/tools/winglang',
        description:
            'We’re seeing a lot of movement in the infrastructure-as-code (IaC) space with tools like Winglang emerging. Winglang takes a different approach to defining infrastructure and run-time behavior. It provides high-level abstractions over platform specifics provided by tools such as CloudFormation, Terraform, Pulumi and Kubernetes...',
        date: 'Apr 03, 2024',
        datetime: '2024-04-13',
        author: {
            name: 'Eryka S',
            href: '#'
        },
    },
    // More posts...
]

export default function Example() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 px-6 sm:gap-y-16 lg:grid-cols-2 lg:px-8">
                <article className="mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-lg">
                    <time dateTime={featuredPost.datetime} className="block text-sm leading-6 text-gray-600">
                        {featuredPost.date}
                    </time>
                    <h2 id="featured-post" className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {featuredPost.title}
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600">{featuredPost.description}</p>
                    <div className="mt-4 flex flex-col justify-between gap-6 sm:mt-8 sm:flex-row-reverse sm:gap-8 lg:mt-4 lg:flex-col">
                        <div className="flex">
                            <a
                                href={featuredPost.href}
                                target='_blank'
                                aria-describedby="featured-post"
                                className="text-sm font-semibold leading-6 text-teal-500"
                            >
                                Continue reading <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                        {/* <div className="flex lg:border-t lg:border-gray-900/10 lg:pt-8">
                            <a
                                href={featuredPost.author.href}
                                className="flex gap-x-2.5 text-sm font-semibold leading-6 text-gray-900"
                            >
                                <img alt="" src={featuredPost.author.imageUrl} className="h-6 w-6 flex-none rounded-full bg-gray-50" />
                                {featuredPost.author.name}
                            </a>
                        </div> */}
                    </div>
                </article>
                <div className="mx-auto w-full max-w-2xl border-t border-gray-900/10 pt-12 sm:pt-16 lg:mx-0 lg:max-w-none lg:border-t-0 lg:pt-0">
                    <div className="-my-12 divide-y divide-gray-900/10">
                        {posts.map((post) => (
                            <article key={post.id} className="py-12">
                                <div className="group relative max-w-xl">
                                    <time dateTime={post.datetime} className="block text-sm leading-6 text-gray-600">
                                        {post.date}
                                    </time>
                                    <h2 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-gray-600">
                                        <a href={post.href} target='_blank' className='text-wing'>
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </a>
                                    </h2>
                                    <p className="mt-4 text-sm leading-6 text-gray-600">{post.description}</p>
                                </div>
                                {/* <div className="mt-4 flex">
                                    <a
                                        href={post.author.href}
                                        className="relative flex gap-x-2.5 text-sm font-semibold leading-6 text-gray-900"
                                    >
                                        <img alt="" src={post.author.imageUrl} className="h-6 w-6 flex-none rounded-full bg-gray-50" />
                                        {post.author.name}
                                    </a>
                                </div> */}
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
