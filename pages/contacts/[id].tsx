import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { FC } from 'react';
import ContactInfo from '@/components/ContactInfo';
import { IContact } from '@/types';

type ContactProps = {
  contact: IContact;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await res.json();

  if (!data) {
    return { notFound: true };
  }
  return { props: { contact: data } };
};

const Contact: FC<ContactProps> = ({ contact }) => (
  <>
    <Head>
      <title>Contact</title>
    </Head>
    <ContactInfo contact={contact}></ContactInfo>
  </>
);
export default Contact;
