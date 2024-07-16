import React from 'react';
import { createPortal } from 'react-dom';
import codeStyle from "react-syntax-highlighter/dist/cjs/styles/prism/dracula";
import { Prism as PrismSyntaxHighlighter } from "react-syntax-highlighter";

type Props = {
    children: any
    language: string
}

const Portal = ({ children }: any) => {

    const [showPortal, setShowPortal] = React.useState(false);

    React.useEffect(() => {
        setShowPortal(true);
    }, []);

    if (!showPortal) return null;

    return createPortal(
        children,
        document.getElementById('playground-portal')
    );
}

const CopyCodeBlock = ({ language = "typescript", code, showLineNumbers = false, renderPlayground = false }: any) => {

    const [isCopied, setIsCopied] = React.useState(false);

    const copy = () => {
        navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1700);
    };

    if (!code) return null;



    return (
        <div className='relative max-h-[46em] overflow-y-auto group'>
            {/* <div onClick={copy} className='w-full  h-full absolute top-0 right-0  flex justify-end items-start group hover:bg-wing/10 hover:cursor-pointer'> */}
            <button onClick={copy} className="hidden absolute top-1 right-0 group-hover:block bg-black/10 mt-2 opacity-50 hover:opacity-100  w-6 h-6 mr-2  hover:cursor-pointer border-none p-0 m-0">
                {!isCopied && <svg className='p-0.5' viewBox="0 0 24 24"><path fill="#fff" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg>}
                {isCopied && <svg viewBox="0 0 24 24" className='p-0.5 text-green-500'><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg>}
            </button>
            {renderPlayground &&
                <>
                    <button onClick={() => window.open(`https://www.winglang.io/play/?code=(${encodeURIComponent(Buffer.from(code).toString('base64'))})`)} className="hidden hover:cursor-pointer absolute top-1 right-[11em] group-hover:block bg-black/10 mt-2 opacity-50 hover:opacity-100  w-6 h-6 mr-2  border-none p-0 m-0">
                        Open in Playground
                    </button>
                    <Portal>
                        <a href={`https://www.winglang.io/play/?code=(${encodeURIComponent(Buffer.from(code).toString('base64'))})`} target='_blank' className='bg-wing/40 px-2 py-1.5 rounded-md text-white cursor-pointer hover:bg-wing/50'>Try this pattern in the playground &rarr;</a>
                    </Portal>
                </>
            }
            
            {/* </div> */}
            <PrismSyntaxHighlighter language={language} style={codeStyle} className="text-xs" showLineNumbers={showLineNumbers}>
                {code}
            </PrismSyntaxHighlighter>
        </div>
    );
};

export default CopyCodeBlock;