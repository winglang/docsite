import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import codeStyle from "react-syntax-highlighter/dist/cjs/styles/prism/dracula";
import { Prism as PrismSyntaxHighlighter } from "react-syntax-highlighter";
import TabbedCode from '@site/src/components/TabbedCode';
import CopyCodeBlock from '@site/src/components/CopyCodeBlock';

const filters = [
    {
        id: 'type',
        name: 'Type',
        options: [
            { value: 'guides', label: 'Guides' },
            { value: 'patterns', label: 'Patterns' },
            { value: 'interactive', label: 'Interactive tutorials' },
        ],
    },
    {
        id: 'platforms',
        name: 'Platforms',
        options: [
            { value: 'aws', label: 'AWS' },
            { value: 'google', label: 'Google Cloud' },
            { value: 'azure', label: 'Microsoft Azure' },
            { value: 'simulator', label: 'Wing simulator' },
            { value: 'custom', label: 'Custom platforms' },
        ],
    },
    {
        id: 'language',
        name: 'programming language',
        options: [
            { value: 'wing', label: 'Wing' },
            { value: 'typescript', label: 'TypeScript' }
        ],
    },
]

const results = [
    {
        id: 'some-random-id',
        title: 'React, Vite & WebSockets',
        type: 'solution',
        subtitle: "Build a simple web application with React for our frontend and Wing for our backend.",
        platforms: ['awscdk', 'awstf', 'sim'],
        language: ['wing']
    },
    {
        id: 'some-random-id',
        title: 'Building a Private API Gateway',
        type: 'solution',
        subtitle: "Create a secure API Gateway inside an AWS Virtual Private Cloud (VPC) using Winglang",
        platforms: ['awscdk', 'awstf', 'sim'],
        language: ['wing']
    },
    {
        id: 'some-random-id',
        title: 'HTTP API with Basic Auth',
        type: 'solution',
        subtitle: "HTTP API example authenticating with Basic Auth.",
        platforms: ['awscdk', 'awstf', 'sim'],
        language: ['wing']
    },
    {
        id: 'some-random-id',
        title: 'Using Redis with Wing',
        type: 'solution',
        subtitle: "Pattern to bring redis into your application.",
        platforms: ['awscdk', 'awstf', 'sim'],
        language: ['wing']
    }

]

export default function Home(props) {
    // const { siteConfig } = useDocusaurusContext();
    return (
        <Layout title="" description="Wing Examples">

            <main className="mx-auto max-w-[85em] py-4 pb-40 w-full  ">
                <div className="border-b border-gray-100 pb-4">
                    {/* <h1 className="text-4xl font-bold tracking-tight text-gray-100">Wing, React example</h1>
                    <p className="mt-4 text-base text-gray-300">
                        Build a simple web application with React for our frontend and Wing for our backend.
                    </p> */}
                </div>

                <div className="lg:grid lg:grid-cols-3 xl:grid-cols-4">
                    <div className="lg:col-span-2 lg:mt-0 xl:col-span-3 w-5/6  ">
                        <section className='prose prose-lg text-gray-300'>
                            <h1 className="text-4xl font-bold tracking-tight text-gray-100 m-0 p-0">Wing, React example</h1>

                            <div className="flex text-sm items-center justify-start space-x-2 gray-spacer">
                                <span>Platforms:</span>
                                <ul className='list-none p-0 flex space-x-2 m-0'>
                                    <li><svg className="w-6 h-6" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#fff" d="M4.51 7.687c0 .197.02.357.058.475.042.117.096.245.17.384a.233.233 0 01.037.123c0 .053-.032.107-.1.16l-.336.224a.255.255 0 01-.138.048c-.054 0-.107-.026-.16-.074a1.652 1.652 0 01-.192-.251 4.137 4.137 0 01-.165-.315c-.415.491-.936.737-1.564.737-.447 0-.804-.129-1.064-.385-.261-.256-.394-.598-.394-1.025 0-.454.16-.822.484-1.1.325-.278.756-.416 1.304-.416.18 0 .367.016.564.042.197.027.4.07.612.118v-.39c0-.406-.085-.689-.25-.854-.17-.166-.458-.246-.868-.246-.186 0-.377.022-.574.07a4.23 4.23 0 00-.575.181 1.525 1.525 0 01-.186.07.326.326 0 01-.085.016c-.075 0-.112-.054-.112-.166v-.262c0-.085.01-.15.037-.186a.399.399 0 01.15-.113c.185-.096.409-.176.67-.24.26-.07.537-.101.83-.101.633 0 1.096.144 1.394.432.293.288.442.726.442 1.314v1.73h.01zm-2.161.811c.175 0 .356-.032.548-.096.191-.064.362-.182.505-.342a.848.848 0 00.181-.341c.032-.129.054-.283.054-.465V7.03a4.43 4.43 0 00-.49-.09 3.996 3.996 0 00-.5-.033c-.357 0-.618.07-.793.214-.176.144-.26.347-.26.614 0 .25.063.437.196.566.128.133.314.197.559.197zm4.273.577c-.096 0-.16-.016-.202-.054-.043-.032-.08-.106-.112-.208l-1.25-4.127a.938.938 0 01-.049-.214c0-.085.043-.133.128-.133h.522c.1 0 .17.016.207.053.043.032.075.107.107.208l.894 3.535.83-3.535c.026-.106.058-.176.1-.208a.365.365 0 01.214-.053h.425c.102 0 .17.016.213.053.043.032.08.107.101.208l.841 3.578.92-3.578a.458.458 0 01.107-.208.346.346 0 01.208-.053h.495c.085 0 .133.043.133.133 0 .027-.006.054-.01.086a.76.76 0 01-.038.133l-1.283 4.127c-.032.107-.069.177-.111.209a.34.34 0 01-.203.053h-.457c-.101 0-.17-.016-.213-.053-.043-.038-.08-.107-.101-.214L8.213 5.37l-.82 3.439c-.026.107-.058.176-.1.213-.043.038-.118.054-.213.054h-.458zm6.838.144a3.51 3.51 0 01-.82-.096c-.266-.064-.473-.134-.612-.214-.085-.048-.143-.101-.165-.15a.378.378 0 01-.031-.149v-.272c0-.112.042-.166.122-.166a.3.3 0 01.096.016c.032.011.08.032.133.054.18.08.378.144.585.187.213.042.42.064.633.064.336 0 .596-.059.777-.176a.575.575 0 00.277-.508.52.52 0 00-.144-.373c-.095-.102-.276-.193-.537-.278l-.772-.24c-.388-.123-.676-.305-.851-.545a1.275 1.275 0 01-.266-.774c0-.224.048-.422.143-.593.096-.17.224-.32.384-.438.16-.122.34-.213.553-.277.213-.064.436-.091.67-.091.118 0 .24.005.357.021.122.016.234.038.346.06.106.026.208.052.303.085.096.032.17.064.224.096a.46.46 0 01.16.133.289.289 0 01.047.176v.251c0 .112-.042.171-.122.171a.552.552 0 01-.202-.064 2.427 2.427 0 00-1.022-.208c-.303 0-.543.048-.708.15-.165.1-.25.256-.25.475 0 .149.053.277.16.379.106.101.303.202.585.293l.756.24c.383.123.66.294.825.513.165.219.244.47.244.748 0 .23-.047.437-.138.619a1.436 1.436 0 01-.388.47c-.165.133-.362.23-.591.299-.24.075-.49.112-.761.112z"></path> <g fill="#F90" fill-rule="evenodd" clip-rule="evenodd"> <path d="M14.465 11.813c-1.75 1.297-4.294 1.986-6.481 1.986-3.065 0-5.827-1.137-7.913-3.027-.165-.15-.016-.353.18-.235 2.257 1.313 5.04 2.109 7.92 2.109 1.941 0 4.075-.406 6.039-1.239.293-.133.543.192.255.406z"></path> <path d="M15.194 10.98c-.223-.287-1.479-.138-2.048-.069-.17.022-.197-.128-.043-.24 1-.705 2.645-.502 2.836-.267.192.24-.053 1.89-.99 2.68-.143.123-.281.06-.218-.1.213-.53.687-1.72.463-2.003z"></path> </g> </g></svg></li>
                                    <li><svg className="w-6 h-6" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="#0089D6"> <path d="M7.47 12.412l3.348-.592.031-.007-1.722-2.049a291.474 291.474 0 01-1.723-2.058c0-.01 1.779-4.909 1.789-4.926a788.95 788.95 0 012.934 5.066l2.95 5.115.023.039-10.948-.001 3.317-.587zM.9 11.788c0-.003.811-1.412 1.803-3.131L4.507 5.53l2.102-1.764C7.765 2.797 8.714 2 8.717 2a.37.37 0 01-.033.085L6.4 6.981 4.16 11.789l-1.63.002c-.897.001-1.63 0-1.63-.003z"></path> </g> </g></svg></li>
                                    <li>
                                        <svg aria-labelledby="titleID descID" className='w-32 h-6 text-wing' viewBox="0 0 1807 346" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M230.919 80.7529C215.169 80.7529 201.279 89.0247 189.664 105.396C177.705 122.318 168.985 146.375 160.575 169.64C157.749 177.429 154.923 185.287 151.959 192.835C148.995 185.253 146.134 177.394 143.308 169.571C134.898 146.306 126.213 122.249 114.253 105.327C102.639 88.9902 88.7489 80.684 72.9981 80.684H0V107.877C4.34266 107.877 11.0979 109.256 19.5765 121.25C29.3991 135.14 37.4641 157.404 45.2533 179.014C52.5945 199.28 60.1424 220.27 69.8962 236.399C82.6485 257.596 97.6065 267.867 115.598 267.867C132.003 267.867 143.894 258.837 151.959 249.531C160.024 258.837 171.914 267.867 188.32 267.867C206.311 267.867 221.235 257.561 234.021 236.399C243.741 220.27 251.323 199.28 258.664 178.945C266.453 157.404 274.484 135.14 284.307 121.25C292.82 109.256 299.575 107.877 303.918 107.877V80.6495H230.919V80.7529ZM115.598 240.777C96.0211 240.777 82.3727 203.002 70.3098 169.64C62.3138 147.547 54.0765 124.697 42.9786 107.981H72.9636C77.3063 107.981 84.0616 109.359 92.5746 121.353C102.397 135.243 110.462 157.508 118.251 179.083C123.938 194.868 129.832 211.102 136.725 225.129C127.626 239.019 120.423 240.777 115.598 240.777ZM233.573 169.709C221.545 203.037 207.896 240.777 188.32 240.777C183.495 240.777 176.291 239.019 167.193 225.129C174.086 211.102 179.945 194.868 185.666 179.049C193.455 157.508 201.486 135.243 211.308 121.353C219.821 109.359 226.577 107.981 230.919 107.981H260.904C249.841 124.697 241.569 147.547 233.573 169.709Z" fill="#F6F6F6" />
                                        </svg>
                                    </li>
                                </ul>
                            </div>

                            <p className="mt-4 text-base text-gray-300">
                                Build a simple web application with React for our frontend and Wing for our backend.
                            </p>
                            {/* <img src="https://github.com/winglang/wing/assets/598796/e6e5e8d9-52fc-4fdf-a600-ba00271b6ef6" className='h-32'/> */}
                            <div className="h-64 w-full bg-red-800/20 flex items-center justify-center text-gray-200">Place holder for image</div>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque omnis animi soluta, libero eius quam sit voluptatum. Aut quaerat voluptas numquam facilis, quas beatae rerum magni optio similique, qui culpa!
                            </p>
                            <div className='not-prose'>

                                <PrismSyntaxHighlighter language="typescript" style={codeStyle} className="text-sm">
                                    {`bring vite;
bring cloud;

let api = new cloud.Api(cors: true);

new vite.Vite(
  root: "../frontend",
  publicEnv: {
    TITLE: "Wing + Vite + React",
    API_URL: api.url
  }
);                                `}
                                </PrismSyntaxHighlighter>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque omnis animi soluta, libero eius quam sit voluptatum. Aut quaerat voluptas numquam facilis, quas beatae rerum magni optio similique, qui culpa!
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque omnis animi soluta, libero eius quam sit voluptatum. Aut quaerat voluptas numquam facilis, quas beatae rerum magni optio similique, qui culpa!
                                </p>
                                <h2>Lorem, ipsum dolor sit amet</h2>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit, exercitationem! Quos officia quis minima cum debitis accusantium mollitia iste alias quae delectus, saepe eveniet nobis. Accusantium quidem voluptatem modi asperiores.</p>
                            </div>
                        </section>
                    </div>
                    <aside className="px-4 space-y-6 pt-8">
                        {/* <h2>SideBar</h2> */}

                        <div className='space-y-8 gray-spacer pb-8 '>

                            <div className='space-y-1'>
                                <span className='font-bold '>Clone</span>
                                <div className='overflow-x-auto'>
                                    <CopyCodeBlock code={"git clone https://github.com/winglang/examples/tree/main/examples/react-website"} />
                                </div>
                            </div>

                            <div className='space-y-1'>
                                <span className='font-bold '>Run locally in simulator</span>
                                <CopyCodeBlock code={"wing it"} />
                            </div>

                            <div className='space-y-1'>
                                {/* <span className='font-bold '>Clone</span> */}
                                <TabbedCode />
                            </div>
                        </div>

                        <div className='space-y-2 gray-spacer pb-8'>
                            <h3 className='p-0 m-0'>Resources</h3>
                            <p className=' p-0 m-0 text-sm'>Dive deeper with extra resources</p>
                            <ul className='list-none p-0 text-sm space-y-1'>
                                <li className="text-wing">Run application locally with the Wing simulator</li>
                                <li className="text-wing">Learn more about the Wing Cloud library </li>
                            </ul>
                        </div>

                        <div className='space-y-2 gray-spacer pb-8'>
                            <h3 className='p-0 m-0'>Author</h3>
                            <div class="flex">
                                <div class="mr-4 flex-shrink-0">
                                    <img src="https://pbs.twimg.com/profile_images/1262283153563140096/DYRDqKg6_400x400.png" className='h-16 w-16 rounded-sm' />
                                    {/* <svg class="h-16 w-16 border border-gray-300 bg-white text-gray-300" preserveAspectRatio="none" stroke="currentColor" fill="none" viewBox="0 0 200 200" aria-hidden="true">
                                        <path vector-effect="non-scaling-stroke" stroke-width="1" d="M0 0l200 200M0 200L200 0" />
                                    </svg> */}
                                </div>
                                <div className='text-sm'>
                                    <h4 class="text-lg font-bold mb-0">David Boyne</h4>
                                    <p className='text-sm text-gray-400'>Developer Advocate, Wing.</p>
                                </div>
                            </div>
                        </div>

                        <div className='space-y-2 '>
                            <h3 className='p-0 m-0'>Join the community</h3>
                            <p className=' text-sm text-gray-200'>Got a question about this example? <br /> <a className='text-wing' href="">Join us on Discord &rarr;</a></p>
                        </div>


                        <button
                            type="button"
                            onClick={() => setMobileFiltersOpen(true)}
                            className="inline-flex items-center lg:hidden"
                        >
                            <span className="text-sm font-medium text-gray-300">Filters</span>
                            {/* <PlusIcon aria-hidden="true" className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" /> */}
                        </button>

                    </aside>
                </div>

            </main>
        </Layout>
    );
}

