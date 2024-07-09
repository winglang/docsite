import React, { useState } from 'react';
import CopyCodeBlock from './CopyCodeBlock';

const platforms = ['awscdk', 'tf-aws', 'sim'];

const commands = {
    'awscdk': {
        compile: 'wing compile --output cdk.out --platform @winglang/platform-awscdk main.w',
        label: 'AWS (CDK)'
    },
    'tf-aws': {
        compile: 'wing compile --platform tf-aws',
        label: 'AWS (Terraform)'
    },
    'tf-gcp': {
        compile: 'wing compile --platform tf-gcp',
        label: 'Google Cloud (Terraform)'
    },
    'tf-azure': {
        compile: 'wing compile --platform tf-azure',
        label: 'Azure (Terraform)'
    },
    'sim': {
        compile: 'wing compile --platform sim',
        label: 'Wing Simulator (sim)'
    }
}

const buildTabs = (platforms: string[]) => {
    return platforms.map(platform => {
        return {
            label: commands[platform].label,
            value: commands[platform].compile
        }
    })
};

const tabs = buildTabs(platforms);

const TabbedCode = () => {

    const [selectedTab, setSelectedTab] = useState<string>(tabs[0].value);


    return (
        <div className='overflow-x-auto '>
            <div className="bg-gray-900/30 flex justify-between">
                <span className='font-bold'>Compile</span>
                <select className='bg-gray-800 text-[10px] px-2 py-0 rounded-md h-7 focus:ring-teal-500 focus:border-teal-500' onChange={e => setSelectedTab(e.target.value)}>
                    {tabs.map(tab => (
                        <option key={tab.label} value={tab.value}>{tab.label}</option>
                    ))}
                    {/* <option>AWS</option> */}
                    {/* <option>Google Cloud</option> */}
                    {/* <option>Azure</option> */}
                    {/* <option>Wing Simulator</option> */}
                </select>
            </div>
            <CopyCodeBlock code={selectedTab}/>
            {/* <code className='text-xs p-2 inline-block w-[200%] rounded-none'>
               {selectedTab}
            </code> */}
        </div>
    );
};

export default TabbedCode;