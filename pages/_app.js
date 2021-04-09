import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { globalStyles } from '../shared/globalstyles';
export default function App({ Component, pageProps }) {
  const [isSessionStateStale, setIsSessionStateStale] = useState(true);

  const [isSessionValid, setIsSessionValid] = useState(false);
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/is-session-valid');
      const data = await response.json();
      const newValue = data.isSessionValid;

      setIsSessionValid(newValue);
      setIsSessionStateStale(false);
    }
    if (isSessionStateStale) fetchData();
  }, [isSessionStateStale, router.pathname]);
  return (
    <>
      {globalStyles}
      <Layout isSessionValid={isSessionValid}>
        <Component
          {...pageProps}
          setIsSessionStateStale={setIsSessionStateStale}
          isSessionValid={isSessionValid}
        />
      </Layout>
    </>
  );
}
