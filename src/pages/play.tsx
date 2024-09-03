import { useEffect } from 'react';

// Load the docs by default
export default function Home() {
    useEffect(() => {
        // Get the query string code
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            // Redirect to the play page with the code
            // @ts-ignore
            window.location = `https://play.winglang.io/play?code=${code}`;
            return;
        }
        // @ts-ignore
        window.location = 'https://play.winglang.io/play';
    }, [])
}