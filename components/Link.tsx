import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  href: string,
  children: JSX.Element,
}

const CustomLink: React.FC<Props> = ({ href, children }) => {
  const router = useRouter();

  let className = children.props.className || '';

  if (router.pathname === href) {
    className = `${className} selected`;
  }

  return (
    <Link href={href}>
      {React.cloneElement(children, { className })}
    </Link>
  );
};

export default CustomLink;
