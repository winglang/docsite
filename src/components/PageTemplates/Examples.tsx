import React, { useMemo } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import type { RouteConfig } from '@docusaurus/types'



type Platforms = 'awscdk' | 'tf-aws' | 'sim' | 'tf-gcp' | 'tf-azure';
type Language = 'wing' | 'typescript';
type Resource = { label: string, href: string }
type Author = { name: string, role: string, twitter?: string, github?: string }

type Example = {
    title: string,
    subtitle: string,
    type: string[]
    slug: string
    platforms: Platforms[]
    language: Language[]
    resources?: Resource[]
    authors?: Author[]
    content: string
}

type Props = {
    route: RouteConfig & {
        customData: {
            examples: Example[]
        };
    }
}

const platformMap = {
    awscdk: 'AWS CDK',
    'tf-aws': 'Terraform AWS',
    sim: 'Wing Simulator',
    'tf-gcp': 'Terraform GCP',
    'tf-azure': 'Terraform Azure'
}

const getFiltersFromExamples = (examples: Example[]) => {

    const types = examples.reduce((acc, example) => {
        const types = example.type;
        const options = [...acc.options.map(o => o.value), ...types];
        // @ts-ignore
        const uniqueValues = [...new Set(options)];
        console.log('uniqueValues', uniqueValues)
        return {
            ...acc,
            options: uniqueValues.map(value => ({
                value, label: value
            }))
        }
    }, { id: 'type', name: 'Types', options: [] } as { id: string, name: string, options: any });

    const languages = examples.reduce((acc, example) => {
        const types = example.language;
        const options = [...acc.options.map(o => o.value), ...types];
        // @ts-ignore
        const uniqueValues = [...new Set(options)];
        return {
            ...acc,
            options: uniqueValues.map(value => ({ value, label: value }))
        }
    }, { id: 'language', name: 'Languages', options: [] } as { id: string, name: string, options: any });

    const platforms = examples.reduce((acc, example) => {
        const types = example.platforms;
        const options = [...acc.options.map(o => o.value), ...types];
        // @ts-ignore
        const uniqueValues = [...new Set(options)];
        return {
            ...acc,
            options: uniqueValues.map(value => ({ value, label: platformMap[value] || value }))
        }
    }, { id: 'platform', name: 'Platforms', options: [] } as { id: string, name: string, options: any });


    return { types, languages, platforms};
};

export default function Home(props: Props) {

    const examples = props.route.customData.examples;
    const { types, languages, platforms } = useMemo(() => getFiltersFromExamples(examples), [examples])

    const filters = [types, languages, platforms];

    const badgeStyles = {
        guide: 'bg-yellow-500/50',
        pattern: 'bg-red-500/50',
        'interactive-tutorial': 'bg-cyan-500/50'
    }

    return (
        <Layout title="" description="Wing Examples">

            <main className="mx-auto max-w-[85em]  py-6 pb-40 w-full  ">
                <div className="border-b border-gray-100 pb-4">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-100">Wing Examples</h1>
                    <p className="mt-4 text-base text-gray-300">
                        Filter, search, and explore Wing examples easily. Find exactly what you need by using our advanced filtering and search options.
                    </p>
                </div>

                <div className="lg:grid lg:grid-cols-3 xl:grid-cols-4">
                    <aside>
                        <h2 className="sr-only">Filters</h2>

                        <button
                            type="button"
                            onClick={() => setMobileFiltersOpen(true)}
                            className="inline-flex items-center lg:hidden"
                        >
                            <span className="text-sm font-medium text-gray-300">Filters</span>
                            {/* <PlusIcon aria-hidden="true" className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" /> */}
                        </button>

                        <div className="hidden lg:block">
                            <form className="space-y-0 divide-y divide-gray-200">
                                {filters.map((section, sectionIdx) => (
                                    <div key={section.id} className={sectionIdx === 0 ? null : 'pt-10'}>
                                        <fieldset className="border-none">
                                            <span className="block text-sm font-extrabold uppercase text-wing">{section.name}</span>
                                            <div className="space-y-3 pt-6">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex items-center">
                                                        <input
                                                            defaultValue={option.value}
                                                            id={`${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-teal-300 text-teal-500 focus:ring-teal-500"
                                                        />
                                                        <label htmlFor={`${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-300 capitalize">
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </fieldset>
                                    </div>
                                ))}
                            </form>
                        </div>
                    </aside>

                    {/* Product grid */}
                    <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3  p-2">
                        {/* tailwind grid */}
                        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 m-0 p-0">

                            {examples.map((example) => {
                                return (<li key={example.slug} className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-gray-900  text-left pb-4 shadow shadow-white/5">

                                    <div className="  bg-gray-800 h-52 flex justify-center items-center w-full text-gray-500 group-hover:no-underline ">
                                        IMAGE PLACEHOLDER
                                        {/* <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" /> */}

                                    </div>
                                    <div className='px-4 py-2'>
                                        <span className='block text-xl text-gray-100 font-bold  group-hover:no-underline'>{example.title}</span>
                                        <span className='block text-sm pr-12 text-gray-300'>{example.subtitle}</span>
                                    </div>
                                    <div className=''>
                                        <div className="-mt-px flex justify-end divide-x divide-gray-200">
                                            <div className="flex w-full justify-between items-center px-4">
                                                <div className='space-x-2'>
                                                    {example.type.map((type) => {
                                                        return <span key={type} className={`text-xs font-bold px-1 py-0.5 rounded-md capitalize ${badgeStyles[type]}`}>{type.slice(0, 1).toUpperCase() + type.slice(1)}</span>
                                                    })}
                                                    {/* // <span className='text-xs bg-yellow-500/50 font-bold px-1 py-0.5 rounded-md'>Guide</span> */}
                                                    {/* // <span className='text-xs bg-red-500/50 font-bold px-1 py-0.5 rounded-md'>Pattern</span> */}
                                                    {/* // <span className='text-xs bg-cyan-500/50 font-bold px-1 py-0.5 rounded-md'>Interactive tutorial</span> */}
                                                </div>
                                                <Link to={`/docs/examples/${example.slug}`} className="text-wing text-sm">
                                                    View {example.type[0]} &rarr;
                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                                )
                            })}



                        </ul>

                    </div>
                </div>

            </main>
        </Layout>
    );
}

