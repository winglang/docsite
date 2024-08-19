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
import React, { useCallback, useEffect, useLayoutEffect } from 'react'
import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'

export default function Example() {

  useEffect(() => {

    setTimeout(() => {
      // @ts-ignore
      if (window.hbspt) {
        // @ts-ignore
        window.hbspt.forms.create({
          region: "eu1",
          portalId: "26754295",
          formId: "5d8c70c8-d16b-4ee0-b06c-b7fb2931f505",
          target: '#hubspotForm',
          onFormReady: function ($form) {
            // $('input[name="url"]').val(window.location.href).change();
          }
        });
      }
    }, 200);


  }, []);

  return (
    <div className="relative isolate overflow-hidden dark:bg-gray-900 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight dark:text-white sm:text-4xl">Keep up with Wing</h2>
            <p className="mt-4 text-lg leading-8 dark:text-gray-300">
              We are working towards 1.0 release. Subscribe to our newsletter to get updates on our progress.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              {/* <input id="email-5d8c70c8-d16b-4ee0-b06c-b7fb2931f505" name="email" required="" placeholder="Email*" type="email" class="hs-input invalid error" inputmode="email" autocomplete="email" value=""></input> */}
              <div id="hubspotForm"></div>
              {/* <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              /> */}
              {/* <a
                className="flex-none rounded-md bg-wing/70 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Subscribe
              </a> */}
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="hidden dark:block rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <CalendarDaysIcon aria-hidden="true" className="h-6 w-6 text-white" />
              </div>
              <dt className="mt-4 font-semibold dark:text-white">Monthly updates</dt>
              <dd className="mt-2 leading-7 dark:text-gray-400 ml-0">
                Get packaged updates directly into your inbox. New features, bug fixes, and more.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="hidden dark:block rounded-md  dark:bg-white/5 p-2 ring-1 ring-white/10">
                <HandRaisedIcon aria-hidden="true" className="h-6 w-6 text-white" />
              </div>
              <dt className="mt-4 font-semibold dark:text-white">No spam</dt>
              <dd className="mt-2 leading-7 dark:text-gray-400 ml-0">
                We will keep the content focused on Wing and related topics. No spam, ever.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1155/678] w-[72.1875rem] dark:bg-gradient-to-tr from-wing/80 to-wing/50 opacity-30"
        />
      </div>
    </div>
  )
}
