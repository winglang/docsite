import React, { useEffect, useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import type { RouteConfig } from '@docusaurus/types'
import { AWSPlatformIcon, AzurePlatformIcon, GCPPlatformIcon, SimPlatformIcon } from '../PlatformIcons';

type Platforms = 'awscdk' | 'tf-aws' | 'sim' | 'tf-gcp' | 'tf-azure';
type Language = 'wing' | 'typescript';
type Resource = { label: string, href: string }
type Author = { name: string, role: string, twitter?: string, github?: string }

type Example = {
    title: string,
    subtitle: string,
    type: string[]
    url?: string
    slug: string
    coverImage?: string
    platform: Platforms[]
    language: Language[]
    resources?: Resource[]
    cloudResources?: string[]
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
        const types = example.type ?? [];
        const options = [...acc.options.map(o => o.value), ...types];
        // @ts-ignore
        const uniqueValues = [...new Set(options)];
        return {
            ...acc,
            options: uniqueValues.map(value => ({
                value, label: value
            }))
        }
    }, { id: 'type', name: 'Types', options: [] } as { id: string, name: string, options: any });

    const languages = examples.reduce((acc, example) => {
        const types = example.language ?? [];
        const options = [...acc.options.map(o => o.value), ...types];
        // @ts-ignore
        const uniqueValues = [...new Set(options)];
        return {
            ...acc,
            options: uniqueValues.map(value => ({ value, label: value }))
        }
    }, { id: 'language', name: 'Languages', options: [] } as { id: string, name: string, options: any });

    const platforms = examples.reduce((acc, example) => {
        const types = example.platform ?? [];
        const options = [...acc.options.map(o => o.value), ...types];
        // @ts-ignore
        const uniqueValues = [...new Set(options)];
        return {
            ...acc,
            options: uniqueValues.map(value => ({ value, label: platformMap[value] || value }))
        }
    }, { id: 'platform', name: 'Platforms', options: [] } as { id: string, name: string, options: any });

    const cloudResources = examples.reduce((acc, example) => {
        const types = example.cloudResources ?? [];
        const options = [...acc.options.map(o => o.value), ...types];
        // @ts-ignore
        const uniqueValues = [...new Set(options)];
        return {
            ...acc,
            options: uniqueValues.map(value => ({ value, label: platformMap[value] || value }))
        }
    }, { id: 'cloudResources', name: 'Cloud Resources', options: [] } as { id: string, name: string, options: any });


    return { types, languages, platforms, cloudResources };
};

export default function Home(props: Props) {

    const examples = props.route.customData.examples;
    const { types, languages, platforms, cloudResources } = useMemo(() => getFiltersFromExamples(examples), [examples])

    const [filteredExamples, setFilteredExamples] = useState(examples);
    const [selectedFilters, setSelectedFilters] = useState({});

    const filters = [types, languages, platforms, cloudResources];

    const badgeStyles = {
        guide: 'bg-yellow-500/50',
        pattern: 'bg-red-500/50',
        'interactive tutorial': 'bg-cyan-500/50'
    }

    useEffect(() => {
        applyFilters();
    }, [selectedFilters]);

    const applyFilters = () => {
        const filtered = examples.filter(example => {
            return Object.entries(selectedFilters).every(([key, values]) => {
                // @ts-ignore
                if (values.length === 0) {
                    return true;
                }
                // @ts-ignore
                return values.some(value => example[key] && example[key].includes(value));
            });
        });
        setFilteredExamples(filtered);
    };

    // Function to update selected filters
    const handleFilterChange = (e) => {
        const { name, value, checked } = e.target;
        if (!checked) {
            setSelectedFilters(prevFilters => ({
                ...prevFilters,
                [name]: prevFilters[name].filter(v => v !== value)
            }));
        } else {
            setSelectedFilters(prevFilters => ({
                ...prevFilters,
                [name]: prevFilters[name] ? [...prevFilters[name], value] : [value]
            }));
        }

    };

    return (
        <Layout title="" description="Wing Examples">

            <main className="mx-auto max-w-[90em] py-8 lg:pb-40 w-full px-4 md:px-8  ">
                <div className="border-b border-gray-100 lg:pb-4 flex justify-between items-center lg:block">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-800 dark:text-gray-100">Wing Examples</h1>
                    <a href="/contributing/start-here/docs" className="lg:hidden submit-new-example -mt-1 dark:bg-white rounded-md px-2 py-1 text-black dark:hover:bg-wing dark:hover:text-white block">Submit a new example</a>
                    <p className="hidden lg:block mt-4 text-base text-gray-700 dark:text-gray-300">
                        Filter, search, and explore Wing examples easily. Find exactly what you need by using our advanced filtering and search options.
                    </p>
                </div>

                <div className="lg:grid lg:grid-cols-3 xl:grid-cols-4">
                    <aside>
                        <div className="hidden lg:block space-y-8">
                            <form className="space-y-0 divide-y divide-gray-200">
                                {filters.map((section, sectionIdx) => (
                                    <div key={section.id} className={sectionIdx === 0 ? null : 'pt-10'}>
                                        <fieldset className="border-none">
                                            <span className="block text-sm font-extrabold uppercase dark:text-wing">{section.name}</span>
                                            <div className="space-y-3 pt-6">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex items-center">
                                                        <input
                                                            defaultValue={option.value}
                                                            id={`${section.id}-${optionIdx}`}
                                                            name={`${section.id}`}
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded bg-white dark:bg-white border-gray-200 dark:border-teal-800  text-teal-500 dark:text-teal-500 focus:ring-teal-500 example-list-checkbox"
                                                            onChange={handleFilterChange}
                                                        />
                                                        <label htmlFor={`${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-800 dark:text-gray-300 capitalize">
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </fieldset>
                                    </div>
                                ))}
                            </form>
                            <a href="/contributing/start-here/docs" className="submit-new-example dark:bg-white rounded-md px-2 py-1 text-black dark:hover:bg-wing dark:hover:text-white mb-2 inline-block -mt-10">Submit a new example</a>
                        </div>
                    </aside>

                    {/* Product grid */}
                    <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3  p-2">
                        
                        {/* tailwind grid */}
                        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 m-0 p-0">

                            {filteredExamples.map((example) => {
                                return (<li key={example.slug} className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-gray-100/50 dark:bg-gray-900  text-left  shadow shadow-black/10 dark:shadow-white/20">

                                    <div className=" flex justify-center items-center w-full text-gray-500 group-hover:no-underline relative   ">

                                        {example.coverImage &&
                                            <div className='h-52 w-full'>
                                                <div className="relative w-full h-full">
                                                    <div className='bg-gradient-to-t from-black/10  to-white/10 absolute top-0 h-full w-full z-10'></div>
                                                    <img src={example.coverImage} alt="" className="aspect-[16/9] w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] h-full opacity-90" />
                                                    
                                                    {/* <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div> */}
                                                </div>
                                            </div>
                                        }
                                        {!example.coverImage &&
                                            <div className='h-52 w-full bg-gradient-to-b from-wing/80 to-gray-800'>
                                                
                                            </div>
                                        }
                                        {/* IMAGE PLACEHOLDER */}
                                        {/* <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" /> */}
                                        <div className='absolute right-3 bottom-0 opacity-80 z-20'>
                                            {example.platform && example.platform.length > 0 &&
                                                <ul className='list-none p-0 flex space-x-4 m-0'>
                                                    {(example.platform.includes('sim')) && <li><SimPlatformIcon /></li>}
                                                    {(example.platform.includes('awscdk') || example.platform.includes('tf-aws')) && <li><AWSPlatformIcon /></li>}
                                                    {(example.platform.includes('tf-azure')) && <li><AzurePlatformIcon /></li>}
                                                    {(example.platform.includes('tf-gcp')) && <li><GCPPlatformIcon /></li>}
                                                </ul>
                                            }
                                        </div>
                                    </div>
                                    <div className='px-4 py-2 h-full'>
                                        <span className='block text-xl text-gray-900 dark:text-gray-100 font-bold  group-hover:no-underline'>{example.title}</span>
                                        <span className='block text-sm pr-12 text-gray-500 dark:text-gray-300'>{example.subtitle}</span>
                                    </div>
                                    <div className='py-4  flex-col justify-end'>
                                        <div className="-mt-px flex justify-end h-full divide-x divide-gray-200">
                                            <div className="flex w-full justify-between items-center px-4 align-bottom">
                                                <div className=''>
                                                    {example.type.map((type) => {
                                                        return <span key={type} className={`text-xs font-bold px-1 py-0.5 rounded-md capitalize text-white/90 dark:text-white ${badgeStyles[type]}`}>{type.slice(0, 1).toUpperCase() + type.slice(1)}</span>
                                                    })}
                                                </div>
                                                <Link to={example.url || `/docs/examples/${example.slug}`} className="text-wing text-sm">
                                                    View {example.type[0]} &rarr;
                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                                )
                            })}

                            {filteredExamples.length === 0 &&
                                <div className='text-gray-500'>
                                    No examples found that match your selected filters.
                                </div>
                            }



                        </ul>

                    </div>
                </div>

            </main>
        </Layout>
    );
}

