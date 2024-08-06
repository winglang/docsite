import React from 'react';
export default function Example() {
    return (
      <div className="relative isolate overflow-hidden bg-black">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-6xl">
                Finally, a language 
              <br />
              that can speak cloud
            </h2>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-wing/70 px-3.5 py-2.5 text-xl font-semibold text-gray-100 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started
              </a>
              <a href="#" className="text-xl font-semibold leading-6 text-white">
                Playground <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
       
      </div>
    )
  }
  