import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import { useState } from 'react'
import CodeBlock from '@theme/CodeBlock';
import { CapitalOne, Microsoft, ThoughtWorks, Unity } from '../components/Landing/Companies';

import Features from '../components/Landing/Features';
import CrossCloud from '../components/Landing/CrossCloud';
import LocalSimulation from '../components/Landing/LocalSimulation';
import Newsletter from '../components/Landing/Newsletter';
import ExternalBlogs from '../components/Landing/ExternalBlogs';
import Head from '@docusaurus/Head';

const tabs = [
    {
        label: 'Serverless workloads',
        metastring: 'playground',
        left: () => <div className='flex flex-col justify-between h-full text-black dark:text-gray-300'>
            <div>
                <p className='text-lg'>Develop distributed serverless applications in the cloud. </p>
                <ul>
                    <li>Focus on application logic not infrastructure</li>
                    <li>Build with primitives (<a className='dark:text-wing text-teal-700' href="/docs/api/standard-library/cloud/api">APIs</a>, <a className='dark:text-wing text-teal-700' href="/docs/api/standard-library/cloud/function">functions</a>, <a className='dark:text-wing text-teal-700' href="/docs/api/standard-library/cloud/queue">messaging queues,</a> and <a className='dark:text-wing text-teal-700' href="/docs/api/category/cloud">more.</a>) </li>
                    <li>Iterate and test locally with <a className='dark:text-wing text-teal-700' href='/docs/concepts/simulator'>Wing Simulator</a></li>
                    <li>Tests applications end-to-end with the <a className="dark:text-wing text-teal-700" href="/docs/concepts/tests">Wing testing framework</a></li>
                    <li>Catch errors at compile time with end-to-end <a className="dark:text-wing text-teal-700" href="/docs/api/language/variable-declaration">type safety</a></li>
                </ul>
                <p></p>
            </div>
            <footer>
                <a href="/docs/api/category/cloud" className='font-bold dark:text-wing text-teal-700'>Explore the cloud primitives &rarr;</a>
            </footer>
        </div>,
        right: `bring cloud;

// define an API        
let api = new cloud.Api();
// define storage
let store = new cloud.Bucket();

// create routes for the API 
api.get("/employees", inflight (req) => {
  let result = MutJson [];
  let var i = 0;
  for employee in store.list() {
    result.setAt(i, employee);
    i = i + 1;
  }
  return cloud.ApiResponse {
    status: 200,
    body: Json.stringify(result)
  };
});`
    },
    {
        label: 'Extensible',
        metastring: 'playground',
        left: () => <div className='flex flex-col justify-between h-full text-black dark:text-gray-300'>
            <div>
                <p className='text-lg'>Define your own standards, best practices and abstractions. </p>
                <p className='text-lg'>Wing offers a programming model that lets developers create custom resources, <a className='dark:text-wing text-teal-700' href="/docs/winglibs/what-are-winglibs">libraries</a>, and <a className="dark:text-wing text-teal-700" href="/docs/platforms/platforms#creating-a-custom-platform">platforms</a>. </p>
                <ul>
                    <li>Develop custom abstractions tailored to your teams</li>
                    <li>Encapsulate company's best practices, including security, logging, and monitoring</li>
                    <li>Package common patterns and golden paths into Wing libraries ("winglibs")</li>
                    <li>Ensure programs compile Develop custom platforms for your organization</li>
                </ul>
                {/* <p>Wing offers a programming model that lets developers create custom resources, <a className='dark:text-wing text-teal-700' href="/docs/winglibs/what-are-winglibs">libraries</a>, and <a className="dark:text-wing text-teal-700" href="/docs/platforms/platforms#creating-a-custom-platform">platforms</a>.</p>
                <p>This flexibility empowers engineers to build tailored solutions for their teams, ensuring that resources and application code follow your company's best practices, such as security, logging, and monitoring.</p>
                <p>These custom resources can be packaged into <a className="dark:text-wing text-teal-700" href="/docs/winglibs/what-are-winglibs">winglibs</a>, which are <a className='dark:text-wing text-teal-700' href="/docs/winglibs/all-winglibs">reusable libraries</a>. Engineers can import winglibs into any Wing application, making it simple to share and implement these best practices across projects.</p>
                <p></p> */}
            </div>
            <footer>
                <a href="/docs" className='font-bold dark:text-wing text-teal-700'>Getting started with Wing &rarr;</a>
            </footer>
        </div>,
        right: `bring cloud;

// define interfaces
interface IKVStore extends std.IResource { 
  inflight get(key: str): Json;
  inflight set(key: str, value: Json): void;
}

// create custom resources/lib
class BucketBasedKeyValueStore impl IKVStore {
  bucket: cloud.Bucket;
  new() {
    this.bucket = new cloud.Bucket();
  }
  pub inflight get(key: str): Json {
    return this.bucket.getJson(key);
  }
  pub inflight set(key: str, value: Json): void {
    this.bucket.putJson(key, value);
  }
}

// initialize the custom resource
let bucketBased: IKVStore = new BucketBasedKeyValueStore();`
    },
    {
        // label: 'Preflight/Inflight',
        label: 'Compile/runtime APIs',
        metastring: 'playground',
        left: () => <div className='flex flex-col justify-between h-full text-black dark:text-gray-300'>
            <div>
                <p className='text-lg'>Wing differentiates between code that executes during compilation and code that executes after the application has been deployed.</p>
                <ul>
                    <li><strong>Preflight code</strong> is code that runs once at compile time, and is used to generate your application's infrastructure definitions (e.g Terraform, CloudFormation, Kubernetes).</li>
                    <li><strong>Inflight code</strong> is code that runs in the cloud at runtime, and implements your application behavior, typically running inside containers or FaaS.</li>
                </ul>
                <p className='text-lg'>Wing library authors can create abstractions with both preflight and inflight APIs for other developers to use.</p>
            </div>
            <footer>
                <a href="/docs/concepts/inflights" className='font-bold dark:text-wing text-teal-700'>Understanding preflight vs inflight &rarr;</a>
            </footer>
        </div>,
        right: `bring cloud;
bring http;

// Create api at compile time (preflight)
let api = new cloud.Api();

// code inside the route is runtime code (inflight)
api.get("/test", inflight (req) => {
  return cloud.ApiResponse {
    status: 200,
    body: "success!"
  };
});

// runtime code for function (inflight)
let checkEndpoint = inflight () => {
  let url = api.url; // this is OK
  let path = "{url}/test";
  let response = http.get(path);
  assert(response.status == 200);
};

// define new function (preflight)
new cloud.Function(checkEndpoint);
        `
    },
    {
        label: 'Local testing',
        metastring: 'playground',
        left: () => <div className='flex flex-col justify-between h-full text-black dark:text-gray-300'>
            <div>
                <p className='text-lg'>Build cloud applications with confidence.</p>
                <ul>
                    <li>Write tests with the <a className='text-teal-600 dark:text-wing' href="/docs/concepts/tests">wing testing framework</a>.</li>
                    <li>Run tests <a className='dark:text-wing text-teal-700' href="/docs/concepts/tests#running-tests-in-the-simulator">locally on your computer</a> with the <a className='dark:text-wing text-teal-700' href="/docs/platforms/sim">Wing simulator</a></li>
                    <li><a className='dark:text-wing text-teal-700' href="/docs/concepts/tests#running-tests-in-the-cloud">Run tests in the cloud</a> (AWS, Azure, GCP)</li>
                </ul>
            </div>
            <footer>
                <a href="/docs/concepts/tests" className='font-bold dark:text-wing text-teal-700'>Explore the Wing testing framework &rarr;</a>
            </footer>
        </div>,
        right: `bring cloud;

// define a new bucket (storage)        
let b = new cloud.Bucket();

// define test for bucket
test "bucket list should include created file" {
  b.put("file", "lorem ipsum");
  let listOfFile = b.list();
  assert(listOfFile.length == 1);
}

test "bucket starts empty" {
  let listOfFile = b.list();
  assert(listOfFile.length == 0);
}
        `
    }
]

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
};

const LandingPage = () => {

    const [selectedTab, setSelectedTab] = useState(tabs[0]);


    return (
        <Layout title={"Wing Programming Language for the cloud"} >

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
                <div className="py-12 sm:py-32 lg:pb-0">
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
                                A programming language for the cloud
                            </h1>
                            <p className="mt-6 text-md  md:leading-8 dark:text-gray-200 sm:text-2xl md:px-20">
                                Wing combines infrastructure and runtime code in one language, enabling developers to stay in their creative flow, and to deliver better software, faster and more securely.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <a
                                    href="/docs"
                                    className="text-xl rounded-md bg-wing dark:bg-wing/80 px-3.5 py-2.5  font-semibold text-white shadow-sm hover:bg-wing hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                                >
                                    Quick start
                                </a>
                                <a href="https://www.winglang.io/play" className="text-xl font-semibold leading-6 text-wing dark:text-white hover:text-wing">
                                    Playground <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                        <div className="hidden md:block mx-auto text-center py-16 " >
                            <iframe className=' !border-2 !border-wing/40 shadow-[0_10px_20px_0_#3737373d] dark:shadow-[0_10px_100px_0_#2ad5c15c]' width="80%" height="615" style={{ border: 'solid'}} src="https://www.youtube.com/embed/wzqCXrsKWbo?si=mroVDIDNYhGns3bs" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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

            {/* Company Logos */}
            <div className="dark:bg-black md:pt-12 pb-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-center text-lg font-semibold leading-8 dark:text-gray-500 dark:md:text-gray-400 mb-0">
                        Sparks the imagination of thousands
                    </h2>
                    <div className="mx-auto grid max-w-lg grid-cols-2 gap-y-0 md:grid-cols-4 items-center md:gap-x-8  sm:max-w-xl lg:mx-0 lg:max-w-none lg:grid-cols-4 pt-4 ">
                        <CapitalOne />
                        <Microsoft />
                        <ThoughtWorks />
                        <Unity />
                    </div>
                </div>
            </div>

            <div className="relative isolate bg-gray-100/40 dark:bg-gray-900 px-5 md:px-0 py-16 md:py-16 pb-24">
                <div className="mx-auto max-w-6xl lg:px-8">
                    {/* <h2 className="text-xl font-semibold leading-7 text-wing">Winglang</h2> */}
                    <p className="mt-2 text-3xl font-bold tracking-tight dark:text-gray-100 sm:text-5xl">
                        New language for a new programming model
                    </p>
                    <p className="mt-6 text-lg leading-8 dark:text-gray-300">
                        Build cloud applications with cloud primitives and test locally on your machine. Harness the power of the entire cloud ecosystem and reduce the time it takes to test cloud applications from minutes to seconds.
                    </p>

                    <ul className='list-none flex flex-wrap p-0 text-md leading-5 md:leading-none md:text-xl justify-between items-center pt-3 md:pt-8 '>
                        {tabs.map((tab, index) => (
                            <li key={tab.label} className={classNames(tab.label === selectedTab.label ? 'dark:text-white text-wing font-bold' : '', `text-gray-400 dark:text-gray-400 !cursor-pointer dark:hover:text-white hover:text-wing ${tab.className} flex-1 text-center`)} onClick={() => setSelectedTab(tab)}>
                                {tab.label}
                            </li>
                        ))}
                    </ul>
                    <div className="mx-auto grid lg:max-w-none lg:grid-cols-2 bg-gray-300 dark:bg-gradient-to-tl from-wing via-wing/45 to-wing/80 transition-all shadow-[0_10px_20px_0_#3737373d] dark:shadow-[0_10px_100px_0_#2ad5c15c] p-[2px] rounded-md" >
                        <div className="h-full dark:bg-gray-800 bg-white/95 !border-r-wing/30 px-4  " style={{ "borderRight": 'solid' }}>
                            <div className='prose prose-md dark:prose-invert h-full pb-4 text-lg'>
                                {selectedTab.left()}
                            </div>
                        </div>
                        <div className='h-full !rounded-none min-h-[34em] overflow-hidden md:overflow-auto !border-2 !border-t-gray-700 md:border-none' style={{ "borderTop": 'solid' }}>
                            <CodeBlock
                                language="js"
                                className='h-full w-full p-0 m-0 !rounded-none '
                                metastring={selectedTab.metastring}
                            >
                                {selectedTab.right}
                            </CodeBlock>
                        </div>
                    </div>
                </div>
            </div>


            <Features />
            <CrossCloud />
            {/* <Testimonal /> */}
            <LocalSimulation />
            <ExternalBlogs />

            <Newsletter />

            {/* <CTA /> */}



        </Layout>
    );
};

export default LandingPage;
