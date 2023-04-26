import { FC } from 'react';
import { IPost } from '@/types';
import Heading from './Heading';

type PostInfoProps = {
  post: IPost;
};

const PostInfo: FC<PostInfoProps> = ({ post }) => {
  const { userId, title, body } = post || {};

  if (!post) {
    return <Heading Tag="h3" text="Empty post" />;
  }

  return (
    <>
      <Heading Tag="h3" text={title} />
      <div>
        <div>
          <strong>User:</strong> {userId}
        </div>
        <div>
          <strong>Text:</strong> {body}
        </div>
      </div>
    </>
  );
};

export default PostInfo;
