import { FC } from 'react';
import { ISocial } from '@/types';
import Link from 'next/link';
import styles from '@/styles/Socials.module.scss';
import Head from 'next/head';

type SocialsProps = {
  socials: ISocial[];
};

const Socials: FC<SocialsProps> = ({ socials }) => {
  if (!socials) {
    return null;
  }

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.0/css/all.css"
        />
      </Head>
      <ul className={styles.socials}>
        {socials.map(({ id, path, icon }) => {
          return (
            <li key={id}>
              <Link href={path} target="_blank" rel="noopener noreferrer">
                <i className={`fab fa-${icon}`} aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default Socials;
