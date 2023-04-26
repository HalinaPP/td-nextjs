import { FC } from 'react';

type HeadingProps = {
  Tag?: any;
  text: string;
};

const Heading: FC<HeadingProps> = ({ Tag = 'h1', text }) => {
  return <Tag>{text}</Tag>;
};

export default Heading;
