import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import TabbedCode from '@site/src/components/TabbedCode';
import CopyCodeBlock from '@site/src/components/CopyCodeBlock';
import type { RouteConfig } from '@docusaurus/types'
// @ts-ignore
import Markdown from 'react-markdown'
import { AWSPlatformIcon, AzurePlatformIcon, GCPPlatformIcon, SimPlatformIcon } from '@site/src/components/PlatformIcons';


type Platforms = 'awscdk' | 'tf-aws' | 'sim' | 'tf-gcp' | 'tf-azure';
type Language = 'wing' | 'typescript';
type Resource = { label: string, href: string }
type Author = { name: string, role: string, twitter?: string, github?: string }

type Example = {
    title: string,
    subtitle: string,
    platform: Platforms[],
    language: Language[],
    resources?: Resource[]
    authors?: Author[]
    githubURL: string
    coverImage?: string
    coverImageInPage?: boolean
    // Array of options for the cover image, key is a string value is a array
    coverImageOptions?: { [key: string]: string[] }
    content: string
}

type Props = {
    route: RouteConfig & {
        customData: Example;
    }
}

const commands = {
    'awscdk': {
        key: 'awscdk',
        value: 'wing compile --output cdk.out --platform @winglang/platform-awscdk main.w',
        label: 'AWS (CDK)',
        link: {
            "label": "Learn more about AWS CDK Wing Platform",
            "href": "/docs/platforms/AWS/awscdk"
        },
        icon: <AWSPlatformIcon className="w-[18px] h-[18px] mt-1.5" />
    },
    'tf-aws': {
        key: 'tf-aws',
        value: 'wing compile --platform tf-aws',
        label: 'AWS (Terraform)',
        link: {
            "label": "Learn more about AWS Terraform Platform",
            "href": "/docs/platforms/AWS/tf-aws"
        },
        icon: <AWSPlatformIcon className="w-[18px] h-[18px] mt-1.5" />,
        default: true
    },
    'tf-gcp': {
        key: 'tf-gcp',
        value: 'wing compile --platform tf-gcp',
        label: 'Google Cloud (Terraform)',
        link: {
            "label": "Learn more about Google Cloud Terraform Platform",
            "href": "/docs/platforms/google-cloud/tf-gcp"
        },
        icon: <GCPPlatformIcon className="w-[16px] h-[16px] mt-1.5" />
    },
    'tf-azure': {
        key: 'tf-azure',
        value: 'wing compile --platform tf-azure',
        label: 'Azure (Terraform)',
        link: {
            "label": "Learn more about Azure Terraform Platform",
            "href": "/docs/platforms/microsoft-azure/tf-azure"
        },
        icon: <AzurePlatformIcon className="w-[16px] h-[16px] mt-1.5" />
    },
    'sim': {
        key: 'sim',
        value: 'wing compile --platform sim',
        label: 'Wing Simulator (sim)',
        link: {
            "label": "Learn more about the Wing Simulator",
            "href": "/docs/platforms/sim"
        },
        icon: <SimPlatformIcon className='w-[16px] h-[16px] mt-1.5 text-wing' />
    }
}

const getCompileList = (platforms: Platforms[]) => {
    return platforms.map((platform) => {
        return commands[platform]
    });
};

export default function Home(props: Props) {
    const example = props.route.customData as Example;
    const platforms = example.platform;
    const renderCoverImage = example.coverImageInPage || false;

    const compileOptions = getCompileList(platforms);


    // Default Platform, search for wing first then default
    const defaultPlatform = platforms.find((platform) => platform === 'sim') || platforms[0];

    const [selectedPlatform, setSelectedPlatform] = useState<string>(defaultPlatform);
    const [coverImage, setCoverImage] = useState<string>(example.coverImage);


    useEffect(() => {
        if (selectedPlatform && example.coverImageOptions && renderCoverImage) {
            // Set the cover image to load
            const coverImageToLoad = example.coverImageOptions[selectedPlatform] || example.coverImage;
            console.log('coverImageToLoad', example.coverImageOptions.awscdk)
            setCoverImage(coverImageToLoad as string);
        }
    }, [selectedPlatform]);

    return (
        <Layout title={example.title} description={example.subtitle} >

            <Head>
                <meta property="og:image" content={example.coverImage} />
                <meta name="twitter:image" content={example.coverImage} />
            </Head>

            <main className="mx-auto max-w-[90em] py-4 pb-40 w-full px-4 md:px-8  ">
                <div className="border-b border-gray-100 pb-4">
                </div>

                <div className="lg:grid lg:grid-cols-3 xl:grid-cols-4">
                    <div className="lg:col-span-2 lg:mt-0 xl:col-span-3 w-full lg:pr-20  ">
                        <section className=''>
                            <div className='gray-spacer mb-6 pb-2'>
                                <h1 className="text-5xl font-bold tracking-tight text-gray-100 m-0 p-0">{example.title}</h1>
                                {/* <p className="text-base text-gray-300 p-0 m-0 py-2">
                                    {example.subtitle}
                                </p> */}

                                <div className="flex text-base items-center justify-between space-x-2 mb-2 mt-4 ">
                                    <div className="flex items-center justify-between">
                                        <span>Platforms:</span>
                                        {platforms.length > 0 &&
                                            <ul className='list-none p-0 flex space-x-2 m-0'>
                                                {(platforms.includes('sim')) && <li><a href="/docs/platforms/sim"><SimPlatformIcon /></a></li>}
                                                {(platforms.includes('awscdk') || platforms.includes('tf-aws')) && <li><a href="/docs/category/aws"><AWSPlatformIcon /></a></li>}
                                                {(platforms.includes('tf-azure')) && <li><a href="/docs/category/microsoft-azure"><AzurePlatformIcon /></a></li>}
                                                {(platforms.includes('tf-gcp')) && <li><a href="/docs/category/google-cloud"><GCPPlatformIcon /></a></li>}
                                            </ul>
                                        }
                                    </div>
                                    {/* <div className='space-x-2'>
                                        <label htmlFor="platform-select">Choose platform:</label>
                                        <select id="platform-select" className='bg-gray-800 text-sm px-2 py-0 rounded-md h-7 focus:ring-teal-500 focus:border-teal-500' defaultValue={defaultPlatform} onChange={e => setSelectedPlatform(e.target.value)}>
                                            {platforms.map((platform) => (
                                                <option key={platform} value={platform}>{commands[platform].label}</option>
                                            ))}
                                        </select>
                                    </div> */}

                                </div>

                            </div>



                            <div className="prose prose-md prose-invert">
                                {/* {renderCoverImage && coverImage && 
                                    <img src={coverImage} alt={example.title} className="w-full  object-cover rounded-lg" />
                                } */}
                                <h3>{example.subtitle}</h3>
                                {renderCoverImage  && 
                                    <img src={example.coverImage} alt={example.title} className="w-full mb-0  object-cover rounded-lg" />
                                }
                                
                                <Markdown
                                    children={example.content}
                                    className='examples-code-block '
                                    components={{
                                        a: (props) => {
                                            return <a className='text-wing' {...props}>{props.children}</a>
                                        },
                                        // Used a tip
                                        blockquote: (props) => {
                                            return <div className="bg-teal-500/20 rounded-md my-4 mb-6 border-l-4 border-yellow-500 px-2 py-3 example-quote">
                                                <div className='flex space-x-2 items-center px-2 font-bold'>
                                                    <svg className="w-6 h-6 text-white-500 block" viewBox="0 0 14 16"><path fill='currentColor' fill-rule="currentColor" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
                                                    <span className='uppercase text-sm'>INFO</span>
                                                </div>
                                                <span className='block px-2 p-0'>{props.children}</span>
                                            </div>
                                        },
                                        code(props) {
                                            const { children, className, node, ...rest } = props
                                            const match = /language-(\w+)/.exec(className || '')
                                            return match ? (
                                                <div>
                                                    <CopyCodeBlock
                                                        {...rest}
                                                        PreTag="div"
                                                        children={String(children).replace(/\n$/, '')}
                                                        code={String(children).replace(/\n$/, '')}
                                                        language={match[1]}
                                                        className="max-h-[30em] overflow-y-auto"
                                                        showLineNumbers
                                                    />
                                                </div>
                                            ) : (
                                                <code {...rest} className={className}>
                                                    {children}
                                                </code>
                                            )
                                        }
                                    }}
                                />
                            </div>

                        </section>
                    </div>
                    {/* SideBar */}
                    <aside className="lg:px-4 space-y-6 lg:pt-8 pt-4">
                        <hr className="bg-gray-700 p-0 m-0" />
                        <h3>Installation </h3>
                        <div className='space-y-8 gray-spacer pb-8 '>

                            <div className='space-y-1'>
                                <span className='font-bold '>Clone</span>
                                <div className='overflow-x-auto'>
                                    <CopyCodeBlock code={`git clone ${example.githubURL}`} />
                                </div>
                            </div>

                            {platforms.includes('sim') &&
                                <div className='space-y-1'>
                                    <span className='font-bold '>Run locally in simulator</span>
                                    <CopyCodeBlock code={"wing it"} />
                                    <Link to="/docs/platforms/sim" className="text-xs text-right block">Learn more about the Wing Simulator &rarr;</Link>
                                </div>
                            }

                            <div className='space-y-1'>
                                {/* <span className='font-bold '>Clone</span> */}
                                <TabbedCode options={compileOptions} />

                            </div>
                        </div>

                        {example.resources && example.resources.length > 0 &&
                            <div className='space-y-2 gray-spacer pb-8'>
                                <h3 className='p-0 m-0'>Resources</h3>
                                <p className=' p-0 m-0 text-sm'>Dive deeper with extra resources</p>
                                <ul className='list-none p-0 text-sm space-y-1'>
                                    {example.resources.map((resource, index) => (
                                        <li key={index}>
                                            <Link to={resource.href} className='text-wing'>{resource.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        }

                        {example.authors && example.authors.length > 0 &&
                            <div className='space-y-2 gray-spacer pb-6'>
                                <h3 className='p-0 m-0'>Authors</h3>
                                <div className="space-y-4 py-2">
                                    {example.authors.map((author) => (
                                        <div className='text-sm' key={author.name}>
                                            <h4 className="text-lg font-bold mb-0 leading-none">{author.name}</h4>
                                            <p className='text-sm text-gray-400 m-0 p-0'>{author.role}</p>
                                            {/* Social Links */}
                                            <ul className="list-none p-0 my-0.5 flex items-center space-x-2 justify-start">
                                                {author.twitter && <li><a href={author.twitter}><svg className='h-4 w-4 text-wing hover:text-white' fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 31.812 26"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.877,2.000 C22.519,2.000 24.382,2.652 25.426,3.738 C26.724,3.486 27.949,3.025 29.050,2.386 C28.625,3.687 27.718,4.779 26.540,5.469 C27.693,5.332 28.797,5.035 29.820,4.590 C29.054,5.707 28.087,6.690 26.971,7.477 C26.981,7.715 26.987,7.955 26.987,8.195 C26.987,15.562 21.445,24.000 10.939,24.000 C7.715,24.000 4.507,23.133 1.982,21.551 C2.428,21.605 2.883,21.631 3.343,21.631 C6.019,21.631 8.482,20.740 10.439,19.242 C7.937,19.199 5.827,17.586 5.103,15.373 C5.450,15.437 5.810,15.473 6.178,15.473 C6.696,15.473 7.203,15.406 7.681,15.277 C5.068,14.768 3.100,12.514 3.100,9.813 C3.100,9.787 3.100,9.764 3.100,9.740 C3.871,10.158 4.750,10.410 5.687,10.440 C4.154,9.437 3.147,7.734 3.147,5.799 C3.147,4.777 3.428,3.818 3.919,2.998 C6.735,6.367 10.945,8.588 15.693,8.822 C15.594,8.414 15.543,7.984 15.543,7.553 C15.543,4.473 17.721,2.000 20.877,2.000 M29.820,4.590 L29.825,4.590 M20.877,-0.000 C17.033,-0.000 14.060,2.753 13.614,6.552 C10.425,5.905 7.524,4.204 5.440,1.711 C5.061,1.257 4.503,0.998 3.919,0.998 C3.867,0.998 3.815,1.000 3.763,1.004 C3.123,1.055 2.547,1.413 2.216,1.966 C1.525,3.122 1.159,4.447 1.159,5.799 C1.159,6.700 1.321,7.579 1.625,8.400 C1.300,8.762 1.113,9.238 1.113,9.740 L1.113,9.813 C1.113,11.772 1.882,13.589 3.160,14.952 C3.087,15.294 3.103,15.655 3.215,15.998 C3.657,17.348 4.459,18.510 5.499,19.396 C4.800,19.552 4.079,19.631 3.343,19.631 C2.954,19.631 2.577,19.609 2.222,19.565 C2.141,19.556 2.061,19.551 1.981,19.551 C1.148,19.551 0.391,20.078 0.108,20.886 C-0.202,21.770 0.140,22.753 0.932,23.249 C3.764,25.023 7.318,26.000 10.939,26.000 C17.778,26.000 22.025,22.843 24.383,20.195 C27.243,16.984 28.907,12.718 28.972,8.455 C29.899,7.682 30.717,6.790 31.410,5.792 C31.661,5.458 31.810,5.041 31.810,4.590 C31.810,3.909 31.473,3.308 30.958,2.946 C31.181,2.176 30.925,1.342 30.303,0.833 C29.940,0.537 29.496,0.386 29.049,0.386 C28.708,0.386 28.365,0.474 28.056,0.654 C27.391,1.040 26.680,1.344 25.931,1.562 C24.555,0.592 22.688,-0.000 20.877,-0.000 L20.877,-0.000 Z"></path> </g></svg></a></li>}
                                                {author.github && <li><a href={author.github}><svg className='h-4 w-4 text-wing hover:text-white' viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="currentColor"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" id="github-[#142]"> </path> </g> </g> </g> </g></svg></a></li>}
                                            </ul>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        }

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

