import { FC } from 'react';
import type { AppProps } from 'next/app';
import Image from 'next/image';
import emptyImg from '@/public/empty.jpg';
import Layout from '@/components/Layout';
import '@/styles/globals.scss';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Layout>
    <main>
      <Component {...pageProps} />
    </main>
    <Image
      src={emptyImg}
      width={50}
      height={50}
      alt="vercel"
      placeholder="blur"
    />
  </Layout>
);

export default MyApp;
