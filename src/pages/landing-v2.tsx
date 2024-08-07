import React from 'react';
import Layout from '@theme/Layout';
import { useState } from 'react'
import CodeBlock from '@theme/CodeBlock';
import { CapitalOne, Microsoft, ThoughtWorks, Unity} from '../components/Landing/Companies';

import Features from '../components/Landing/Features';
import CrossCloud from '../components/Landing/CrossCloud';
import LocalSimulation from '../components/Landing/LocalSimulation';
import Testimonal from '../components/Landing/Testimonal';
import Newsletter from '../components/Landing/Newsletter';
import CTA from '../components/Landing/CTA';

const tabs = [
    {
        label: 'Serverless workloads',
        metastring: 'playground',
        left: () => <div className='flex flex-col justify-between h-full'>
            <div>
                <p>Develop distributed serverless applications in the cloud. </p>
                <ul>
                    <li>Focus on application logic not infrastructure</li>
                    <li>Build with primitives (<a className='text-wing' href="/docs/api/standard-library/cloud/api">APIS</a>, <a className='text-wing' href="/docs/api/standard-library/cloud/function">Functions</a>, <a className='text-wing' href="/docs/api/standard-library/cloud/queue">Queues,</a> and <a className='text-wing' href="/docs/api/category/cloud">more.</a>) </li>
                    <li>Iterate and test locally with <a className='text-wing' href='/docs/concepts/simulator'>Wing Simulator</a></li>
                    <li>Test application with <a className="text-wing" href="/docs/concepts/tests">Wing testing framework</a></li>
                    <li>End-to-end <a className="text-wing" href="/docs/api/language/variable-declaration">type safety</a></li>
                </ul>
                <p></p>
            </div>
            <footer>
                <a className='font-bold text-wing'>Explore the cloud primitives &rarr;</a>
            </footer>
        </div>,
        right: `bring cloud;

// define an API        
let api = new cloud.Api();
// define storage
let store = new cloud.Bucket();

// create routes for the API 
api.get("/employees", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
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
        left: () => <div className='flex flex-col justify-between h-full'>
            <div>
                <p>Define your own standards, best practices and abstractions. </p>
                <p>Wing offers a programming model that lets developers create custom resources, <a className='text-wing' href="/docs/winglibs/what-are-winglibs">libraries</a>, and <a className="text-wing" href="/docs/platforms/platforms#creating-a-custom-platform">platforms</a>. </p>
                <ul>
                    <li>Develop custom abstractions tailored to your teams</li>
                    <li>Encapsulate company's best practices, including security, logging, and monitoring.</li>
                    <li>Package code with winglibs</li>
                    <li>Develop custom platforms for your organization</li>
                </ul>
                {/* <p>Wing offers a programming model that lets developers create custom resources, <a className='text-wing' href="/docs/winglibs/what-are-winglibs">libraries</a>, and <a className="text-wing" href="/docs/platforms/platforms#creating-a-custom-platform">platforms</a>.</p>
                <p>This flexibility empowers engineers to build tailored solutions for their teams, ensuring that resources and application code follow your company's best practices, such as security, logging, and monitoring.</p>
                <p>These custom resources can be packaged into <a className="text-wing" href="/docs/winglibs/what-are-winglibs">winglibs</a>, which are <a className='text-wing' href="/docs/winglibs/all-winglibs">reusable libraries</a>. Engineers can import winglibs into any Wing application, making it simple to share and implement these best practices across projects.</p>
                <p></p> */}
            </div>
            <footer>
                <a className='font-bold text-wing'>Getting started with Wing &rarr;</a>
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
        left: () => <div className='flex flex-col justify-between h-full'>
            <div>
                <p>Wing differentiates between code that executes during compilation and code that executes after the application has been deployed by referring to them as preflight and inflight code respectively.</p>
                <ul>
                    <li><strong>Preflight code</strong> is code that runs once, at compile time and generated by your infrastructure (e.g Terraform, CloudFormation, Kubernetes).</li>
                    <li><strong>Inflight code</strong> is code that runs at runtime and implemented your application behavior.</li>
                    <li>Winglib authors can expose preflight/inflight APIs for developers.</li>
                </ul>
            </div>
            <footer>
                <a className='font-bold text-wing'>Understanding preflight vs inflight &rarr;</a>
            </footer>
        </div>,
        right: `bring cloud;
bring http;

// Create api at compile time (preflight)
let api = new cloud.Api();

// code inside the route is runtime code (inflight)
api.get("/test", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
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
        label: 'Local Testing',
        metastring: 'playground',
        left: () => <div className='flex flex-col justify-between h-full'>
            <div>
                <p>Build cloud applications with confidence.</p>
                <ul>
                    <li>Write tests with the <a className='text-wing' href="/docs/concepts/tests">wing testing framework</a>.</li>
                    <li>Run tests <a className='text-wing' href="/docs/concepts/tests#running-tests-in-the-simulator">locally on your computer</a> with the <a className='text-wing' href="/docs/platforms/sim">Wing simulator</a></li>
                    <li><a className='text-wing' href="/docs/concepts/tests#running-tests-in-the-cloud">Run tests in the cloud</a> (AWS, Azure, GCP)</li>
                </ul>
            </div>
            <footer>
                <a href="/docs/concepts/tests" className='font-bold text-wing'>Explore the Wing testing framework &rarr;</a>
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

            {/* <Head>
                <meta property="og:image" content={example.coverImage} />
                <meta name="twitter:image" content={example.coverImage} />
            </Head> */}

            <div className="relative isolate bg-black/60 ">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-wing/80 to-wing/50 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    />
                </div>
                <div className="py-24 sm:py-32 lg:pb-0">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="hidden sm:flex sm:justify-center">
                            <div className="relative rounded-full px-3 py-1 text-lg mb-8 leading-6 text-gray-400 ring-1 ring-wing/70 hover:ring-wing">
                                <span className="mr-3">Wing 1.0 Roadmap</span>
                                <a href="#" className="font-semibold text-wing/80">
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    Read more <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                        <div className="mx-auto max-w-6xl text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-7xl">
                                A programming language for the cloud
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-200 sm:text-2xl px-20">
                                Wing combines infrastructure and runtime code in one language, enabling developers to stay in their creative flow, and to deliver better software, faster and more securely.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <a
                                    href="/docs"
                                    className="text-xl rounded-md bg-wing/80 px-3.5 py-2.5  font-semibold text-white shadow-sm hover:bg-wing hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                                >
                                    Quick start
                                </a>
                                <a href="https://www.winglang.io/play" className="text-xl font-semibold leading-6 text-white hover:text-wing">
                                    Playground <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                        <img
                            alt="App screenshot"
                            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                            width={2432}
                            height={702}
                            className="mt-16 rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 sm:mt-24"
                        />
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
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-wing/10 to-wing/80 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    />

                </div>

            </div>

            {/* Company Logos */}
            <div className="bg-black pt-12 pb-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-center text-lg font-semibold leading-8 text-gray-400 mb-0">
                        Sparks the imagination of thousands
                    </h2>
                    <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8  sm:max-w-xl lg:mx-0 lg:max-w-none lg:grid-cols-4 -mt-10">
                        <CapitalOne />
                        <Microsoft />
                        <ThoughtWorks />
                        <Unity/>
                    </div>
                </div>
            </div>

            <div className="relative isolate overflow-hidden bg-gray-900 py-16 pb-24">
                <div className="mx-auto max-w-6xl lg:px-8">
                    <h4 className='text-gray-100 text-4xl'>New language for a new programming model</h4>

                    <ul className='list-none flex space-x-8 p-0 text-2xl '>
                        {tabs.map((tab, index) => (
                            <li className={classNames(tab.label === selectedTab.label ? 'text-white font-bold' : '', 'text-gray-400 !cursor-pointer hover:text-white')} onClick={() => setSelectedTab(tab)}>
                                {tab.label}
                            </li>
                        ))}
                    </ul>
                    <div className="mx-auto grid max-wxl lg:max-w-none lg:grid-cols-2  bg-gradient-to-tl from-wing via-wing/45 to-wing/80 transition-all shadow-[0_10px_100px_0_#2ad5c15c] p-[2px] rounded-md" >
                        <div className="h-full bg-gray-800 !border-r-wing/30 px-4 !border-2" style={{ "borderRight": 'solid' }}>
                            <div className='prose prose-md dark:prose-invert h-full pb-4'>
                                {selectedTab.left()}
                            </div>
                        </div>
                        <div className='h-full !rounded-none min-h-[34em]  '>
                            <CodeBlock
                                language="js"
                                className='h-full w-full p-0 m-0 !rounded-none'
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

            <Newsletter />

            <CTA />



        </Layout>
    );
};

export default LandingPage;