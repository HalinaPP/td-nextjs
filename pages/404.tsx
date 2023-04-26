import Heading from '@/components/Heading';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

const Error:FC = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }, [router]);

  return (
    <>
      <Head>
        <title>Error</title>
      </Head>
      <Heading text="404" />
      <p>Something is going wrong ...</p>
    </>
  );
};

export default Error;
