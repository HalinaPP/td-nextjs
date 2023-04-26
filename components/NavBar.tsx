import { FC } from 'react';
import styles from '@/styles/NavBar.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navigation = [
  {
    id: 1,
    title: 'Home',
    path: '/'
  },
  {
    id: 2,
    title: 'Posts',
    path: '/posts'
  },
  {
    id: 3,
    title: 'Contacts',
    path: '/contacts'
  }
];

const NavBar:FC = () => {
  const { pathname } = useRouter();

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Image src="/logo.svg" width={80} height={80} alt="logo" />
      </div>
      <div className={styles.links}>
        {navigation.map(({ id, title, path }) => (
          <Link
            key={id}
            href={path}
            className={pathname === path ? styles.active : undefined}
          >
            {title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
