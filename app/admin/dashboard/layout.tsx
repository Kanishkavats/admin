import Navbar from "@/app/admin/ui/dashboard/navbar/navbar"
import Sidebar from "@/app/admin/ui/dashboard/sidebar/sidebar"
import styles from "@/app/admin/ui/dashboard/dashboard.module.css"
import Footer from "@/app/admin/ui/dashboard/footer/footer"

// const Layout = ({children}) => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.menu}>
//         <Sidebar/>
//       </div>
//       <div className={styles.content}>
//         <Navbar/>
//         {children}
//         <Footer/>
//       </div>
//     </div>
//   )
// }
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <><div className={styles.container}>
        <div className={styles.menu}>
          <Sidebar />
        </div>
        <div className={styles.content}>
          <Navbar />
            {children}
           <Footer />
        </div>
      </div>
    </>
  );
}

// export default Layout