import { FC } from 'react';
import Heading from '@/components/Heading';
import { IContact } from '@/types';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

type ContactsProps = {
  contacts: IContact[];
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  if (!data) {
    return { notFound: true };
  }
  return { props: { contacts: data } };
};

const Contacts: FC<ContactsProps> = ({ contacts }) => {
  return (
    <>
      <Head>
        <title>Contacts</title>
      </Head>
      <Heading text="Contacts list:" />
      <ul>
        {contacts &&
          contacts.map(({ id, name }) => (
            <li key={id}>
              <Link href={`contacts/${id}`}>{name}</Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Contacts;
