import { FC } from 'react';
import { IPost } from '@/types';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Heading from '@/components/Heading';

type PostProps ={
  posts: IPost[];
}

export const getStaticProps:GetStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();

  if (!data) {
    return { notFound: true };
  }
  return { props: { posts: data } };
};

const Posts:FC<PostProps> = ({ posts }) => (
  <>
    <Head>
      <title>Posts</title>
    </Head>
    <Heading text="Posts list:" />
    <ul>
      {posts &&
        posts.map(({ id, title }) => (
          <li key={id}>
            <Link href={`posts/${id}`}>{title}</Link>
          </li>
        ))}
    </ul>
  </>
);
export default Posts;
