import { useEffect } from 'react';

// Load the docs by default
export default function Home() {
  useEffect(() => {
    window.location = '/docs';
  }, [])
}
