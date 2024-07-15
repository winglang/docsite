import React, { useState } from 'react';
import CopyCodeBlock from './CopyCodeBlock';
import Link from '@docusaurus/Link';

type Option = {
    value: string,
    label: string,
    icon?: string | JSX.Element
    link?: {
        href: string
        label: string
    }
    default?: boolean
}

type Props = {
    options: Option[]
}

const TabbedCode = ({ options }: Props) => {

    const defaultValue = options.find(option => option.default) || options[0];

    const [selectedTab, setSelectedTab] = useState<Option>(defaultValue);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const selectedOption = options.find(option => option.value === selectedValue);
        setSelectedTab(selectedOption);
    };


    return (
        <div className='overflow-x-auto '>
            <div className="bg-gray-900/30 flex justify-between">
                <div className='flex items-center align-middle space-x-2'>
                    <span className='font-bold block '>Compile</span>
                    {selectedTab.icon &&
                        <span className='block'>
                            {selectedTab.icon}
                        </span>
                    }
                </div>
                <select defaultValue={defaultValue.value} className='bg-gray-800 text-[10px] px-2 py-0 rounded-md h-7 focus:ring-teal-500 focus:border-teal-500' onChange={handleChange}>
                    {options.map(tab => (
                        <option key={tab.label} value={tab.value}>{tab.label}</option>
                    ))}
                </select>
            </div>
            <CopyCodeBlock code={selectedTab.value} />
            {selectedTab.link &&
                <Link to="/docs/concepts/platforms" className="text-xs text-right block">{selectedTab.link.label} &rarr;</Link>
            }
        </div>
    );
};

export default TabbedCode;