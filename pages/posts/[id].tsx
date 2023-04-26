import { FC } from 'react';
import { IPost } from '@/types';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import PostInfo from '@/components/PostInfo';

type PostProps = {
  post: IPost;
}

export const getStaticPaths:GetStaticPaths = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();

  const paths = data.map(({ id }: { id: number }) => ({
    params: { id: id.toString() }
  }));

  return { paths, fallback: false } ;
};

export const getStaticProps:GetStaticProps = async (context) => {
  const {id} =context.params!;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const data = await res.json();

  if (!data) {
    return { notFound: true };
  }
  return { props: { post: data } };
};

const Post:FC<PostProps> = ({ post }) => (
  <>
    <Head>
      <title>Post</title>
    </Head>
    <PostInfo post={post}></PostInfo>
  </>
);
export default Post;
