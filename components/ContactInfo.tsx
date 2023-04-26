import { IContact } from '@/types';
import Heading from './Heading';
import { FC } from 'react';

type ContactInfoProps = {
  contact: IContact;
};

const ContactInfo: FC<ContactInfoProps> = ({ contact }) => {
  const { email, name, address } = contact || {};
  const { street, suite, city, zipcode } = address || {};

  if (!contact) {
    return <Heading Tag="h3" text="Empty content" />;
  }

  return (
    <>
      <Heading Tag="h3" text={name} />
      <div>
        <div>
          <strong>Email:</strong> {email}
        </div>
        <div>
          <strong>Address:</strong> {`${street}, ${suite}, ${city}, ${zipcode}`}
        </div>
      </div>
    </>
  );
};

export default ContactInfo;
