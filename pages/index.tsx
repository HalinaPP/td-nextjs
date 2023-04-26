import { ISocial } from '@/types';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { FC } from 'react';
import Heading from '@/components/Heading';
import Socials from '@/components/Socials';
import styles from '@/styles/Home.module.scss';

interface HomeProps {
  socials: ISocial[];
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch(`${process.env.API_HOST}/socials`);
    const data = await res.json();

    if (!data) {
      return { notFound: true };
    }
    return { props: { socials: data } };
  } catch {
    return { props: { Socials: null } };
  }
};

const Home: FC<HomeProps> = ({ socials }) => {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Home</title>
      </Head>
      <Heading text="Hello world!" />
      <Socials socials={socials} />
    </div>
  );
};

export default Home;
