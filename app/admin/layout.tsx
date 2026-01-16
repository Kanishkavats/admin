// import { Inter } from 'next/font/google'
// import './ui/globals.css'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Lama Dev Next.js Admin Dashboard',
//   description: 'Next.js 14 Tutorial',
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   )
// }
// import type { ReactNode } from "react";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

// export default function RootLayout({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         {children}
//       </body>
//     </html>
//   );
// }

import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./ui/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="root-layout">{children}</div>
    
  );  
    
}
