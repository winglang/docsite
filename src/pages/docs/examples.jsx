import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

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

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
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
                  <div key={section.name} className={sectionIdx === 0 ? null : 'pt-10'}>
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
                            <label htmlFor={`${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-300">
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

              {results.map((result) => {
                return (<li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-gray-900  text-left pb-4 shadow shadow-white/5">
                  <div className="  bg-gray-800 h-52 flex justify-center items-center w-full text-gray-500 ">
                    IMAGE PLACEHOLDER
                    {/* <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" /> */}

                  </div>
                  <div className='px-4 py-2'>
                    <span className='block text-xl text-gray-100 font-bold'>{result.title}</span>
                    <span className='block text-sm pr-12 text-gray-400'>{result.subtitle}</span>
                  </div>
                  <div className=''>
                    <div className="-mt-px flex justify-end divide-x divide-gray-200">
                      <div className="flex w-full justify-end px-4">
                        <a href="mailto:janecooper@example.com" className="text-wing text-sm">
                          View {result.type} &rarr;
                        </a>
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


/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
// 'use client'

// import { useState } from 'react'
// import { Dialog, DialogBackdrop, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
// import { XMarkIcon } from '@heroicons/react/24/outline'
// import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid'



// export default function Example() {
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

//   return (
//     <div className="bg-white">
//       <div>
//         {/* Mobile filter dialog */}
//         <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
//           <DialogBackdrop
//             transition
//             className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
//           />

//           <div className="fixed inset-0 z-40 flex">
//             <DialogPanel
//               transition
//               className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
//             >
//               <div className="flex items-center justify-between px-4">
//                 <h2 className="text-lg font-medium text-gray-100">Filters</h2>
//                 <button
//                   type="button"
//                   onClick={() => setMobileFiltersOpen(false)}
//                   className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
//                 >
//                   <span className="sr-only">Close menu</span>
//                   <XMarkIcon aria-hidden="true" className="h-6 w-6" />
//                 </button>
//               </div>

//               {/* Filters */}
//               <form className="mt-4">
//                 {filters.map((section) => (
//                   <Disclosure key={section.name} as="div" className="border-t border-gray-200 pb-4 pt-4">
//                     <fieldset>
//                       <legend className="w-full px-2">
//                         <DisclosureButton className="group flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
//                           <span className="text-sm font-medium text-gray-100">{section.name}</span>
//                           <span className="ml-6 flex h-7 items-center">
//                             <ChevronDownIcon
//                               aria-hidden="true"
//                               className="h-5 w-5 rotate-0 transform group-data-[open]:-rotate-180"
//                             />
//                           </span>
//                         </DisclosureButton>
//                       </legend>
//                       <DisclosurePanel className="px-4 pb-2 pt-4">
//                         <div className="space-y-6">
//                           {section.options.map((option, optionIdx) => (
//                             <div key={option.value} className="flex items-center">
//                               <input
//                                 defaultValue={option.value}
//                                 id={`${section.id}-${optionIdx}-mobile`}
//                                 name={`${section.id}[]`}
//                                 type="checkbox"
//                                 className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                               />
//                               <label
//                                 htmlFor={`${section.id}-${optionIdx}-mobile`}
//                                 className="ml-3 text-sm text-gray-500"
//                               >
//                                 {option.label}
//                               </label>
//                             </div>
//                           ))}
//                         </div>
//                       </DisclosurePanel>
//                     </fieldset>
//                   </Disclosure>
//                 ))}
//               </form>
//             </DialogPanel>
//           </div>
//         </Dialog>

//         <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//           <div className="border-b border-gray-200 pb-10">
//             <h1 className="text-4xl font-bold tracking-tight text-gray-100">New Arrivals</h1>
//             <p className="mt-4 text-base text-gray-500">
//               Checkout out the latest release of Basic Tees, new and improved with four openings!
//             </p>
//           </div>

//           <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
//             <aside>
//               <h2 className="sr-only">Filters</h2>

//               <button
//                 type="button"
//                 onClick={() => setMobileFiltersOpen(true)}
//                 className="inline-flex items-center lg:hidden"
//               >
//                 <span className="text-sm font-medium text-gray-300">Filters</span>
//                 <PlusIcon aria-hidden="true" className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" />
//               </button>

//               <div className="hidden lg:block">
//                 <form className="space-y-10 divide-y divide-gray-200">
//                   {filters.map((section, sectionIdx) => (
//                     <div key={section.name} className={sectionIdx === 0 ? null : 'pt-10'}>
//                       <fieldset>
//                         <legend className="block text-sm font-medium text-gray-100">{section.name}</legend>
//                         <div className="space-y-3 pt-6">
//                           {section.options.map((option, optionIdx) => (
//                             <div key={option.value} className="flex items-center">
//                               <input
//                                 defaultValue={option.value}
//                                 id={`${section.id}-${optionIdx}`}
//                                 name={`${section.id}[]`}
//                                 type="checkbox"
//                                 className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                               />
//                               <label htmlFor={`${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-400">
//                                 {option.label}
//                               </label>
//                             </div>
//                           ))}
//                         </div>
//                       </fieldset>
//                     </div>
//                   ))}
//                 </form>
//               </div>
//             </aside>

//             {/* Product grid */}
//             <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">{/* Your content */}</div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }
