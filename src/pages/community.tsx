import React from 'react';
import Layout from '@theme/Layout';

import Features from '../components/Landing/Features';
import Newsletter from '../components/Landing/Newsletter';
import Head from '@docusaurus/Head';


const CommunityPage = () => {

    return (
        <Layout title={"Community"} >

            <Head>
                <script type="text/javascript" src="https://js-eu1.hsforms.net/forms/embed/v2.js" />
            </Head>

            <div className="relative isolate bg-white dark:bg-black/60 ">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr  dark:from-wing/80 dark:to-wing/50 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    />
                </div>
                <div className="py-12 sm:py-32 lg:pb-30">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="hidden sm:flex sm:justify-center">
                            <div className="relative rounded-full px-3 py-1 text-lg mb-8 leading-6 dark:text-gray-400 ring-1 ring-wing/70 hover:ring-wing">
                                <span className="mr-3">Wing 1.0 Roadmap</span>
                                <a href="/contributing/roadmap" className="font-semibold dark:text-wing/80">
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    Read more <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                        <div className="mx-auto md:max-w-6xl text-center">
                            <h1 className="text-4xl font-bold tracking-tight dark:text-white sm:text-7xl">
                                Community Powered
                            </h1>
                            <p className="mt-6 text-md  md:leading-8 dark:text-gray-200 sm:text-2xl md:px-20">
                                Built by an awesome group of contributors from around the world who share a passion for making the cloud a great place to build software
                            </p>
                            <div className="mt-10 md:flex items-center justify-center gap-x-6 space-y-4 md:space-y-0">
                                <a
                                    href="https://github.com/winglang/wing"
                                    className="bg-gray-100 dark:bg-gray-900 hover:bg-wing/30 w-full p-8 md:p-10 rounded-sm text-2xl md:text-4xl dark:text-white flex justify-center items-center space-x-8 md:space-x-32  group"
                                >
                                    <span className='w-10 h-10 md:w-20 md:h-20 inline-block'>
                                        <svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>github [#142]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="currentColor"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" id="github-[#142]"> </path> </g> </g> </g> </g></svg>
                                    </span>
                                    <span className='inline-block '>GitHub</span>
                                </a>
                                <a
                                    href="https://t.winglang.io/discord"
                                    className="bg-gray-100 dark:bg-gray-900 hover:bg-wing/30 w-full p-8 md:p-10 rounded-sm text-2xl md:text-4xl dark:text-white flex justify-center items-center space-x-8 md:space-x-32  group"
                                >
                                    <span className='w-10 h-10 md:w-20 md:h-20 inline-block'>
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.8943 4.34399C17.5183 3.71467 16.057 3.256 14.5317 3C14.3396 3.33067 14.1263 3.77866 13.977 4.13067C12.3546 3.89599 10.7439 3.89599 9.14391 4.13067C8.99457 3.77866 8.77056 3.33067 8.58922 3C7.05325 3.256 5.59191 3.71467 4.22552 4.34399C1.46286 8.41865 0.716188 12.3973 1.08952 16.3226C2.92418 17.6559 4.69486 18.4666 6.4346 19C6.86126 18.424 7.24527 17.8053 7.57594 17.1546C6.9466 16.92 6.34927 16.632 5.77327 16.2906C5.9226 16.184 6.07194 16.0667 6.21061 15.9493C9.68793 17.5387 13.4543 17.5387 16.889 15.9493C17.0383 16.0667 17.177 16.184 17.3263 16.2906C16.7503 16.632 16.153 16.92 15.5236 17.1546C15.8543 17.8053 16.2383 18.424 16.665 19C18.4036 18.4666 20.185 17.6559 22.01 16.3226C22.4687 11.7787 21.2836 7.83202 18.8943 4.34399ZM8.05593 13.9013C7.01058 13.9013 6.15725 12.952 6.15725 11.7893C6.15725 10.6267 6.98925 9.67731 8.05593 9.67731C9.11191 9.67731 9.97588 10.6267 9.95454 11.7893C9.95454 12.952 9.11191 13.9013 8.05593 13.9013ZM15.065 13.9013C14.0196 13.9013 13.1652 12.952 13.1652 11.7893C13.1652 10.6267 13.9983 9.67731 15.065 9.67731C16.121 9.67731 16.985 10.6267 16.9636 11.7893C16.9636 12.952 16.1317 13.9013 15.065 13.9013Z" stroke="currentColor" stroke-linejoin="round"></path> </g></svg>
                                    </span>
                                    <span className='inline-block'>Discord</span>
                                </a>
                            </div>

                        </div>

                    </div>

                </div>
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr dark:from-wing/10 dark:to-wing/80 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    />

                </div>

            </div>


            <Features className="bg-gray-100/50 dark:bg-gray-900/20" title="Join our community and help build a better cloud experience" />

            <Newsletter />


        </Layout>
    );
};

export default CommunityPage;
