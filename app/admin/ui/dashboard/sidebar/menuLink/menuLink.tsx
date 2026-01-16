// "use client"

// import Link from 'next/link'
// import styles from './menuLink.module.css'
// import { usePathname } from 'next/navigation'

// const MenuLink = ({item}) => {

//   const pathname = usePathname()

//   return (
//     <Link href={item.path} className={`${styles.container} ${pathname === item.path && styles.active}`}>
//       {item.icon}
//       {item.title}
//     </Link>
//   )
// }

// export default MenuLink

"use client";

import Link from "next/link";
import styles from "./menuLink.module.css";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface MenuItem {
  title: string;
  path: string;
  icon: ReactNode;
}

const MenuLink = ({ item }: { item: MenuItem }) => {
  const pathname = usePathname();
  const isActive = pathname === item.path;

  return (
    <Link
      href={item.path}
      className={`${styles.container} ${isActive ? styles.active : ""}`}
    >
      {item.icon}
      <span>{item.title}</span>
    </Link>
  );
};

export default MenuLink;
