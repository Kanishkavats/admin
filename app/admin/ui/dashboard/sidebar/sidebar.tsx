// import Image from "next/image";
// import MenuLink from "./menuLink/menuLink";
// import styles from "./sidebar.module.css";
// import {
//   MdDashboard,
//   MdSupervisedUserCircle,
//   MdShoppingBag,
//   MdAttachMoney,
//   MdWork,
//   MdAnalytics,
//   MdPeople,
//   MdOutlineSettings,
//   MdHelpCenter,
//   MdLogout,
// } from "react-icons/md";
// // import { auth, signOut } from "@/app/auth";

// const menuItems = [
//   {
//     title: "Pages",
//     list: [
//       {
//         title: "Dashboard",
//         path: "/admin/dashboard",
//         icon: <MdDashboard />,
//       },
//       {
//         title: "Users",
//         path: "/admin/dashboard/users",
//         icon: <MdSupervisedUserCircle />,
//       },
//       {
//         title: "Products",
//         path: "/admin/dashboard/products",
//         icon: <MdShoppingBag />,
//       },
//       {
//         title: "Transactions",
//         path: "/admin/dashboard/transactions",
//         icon: <MdAttachMoney />,
//       },
//     ],
//   },
//   {
//     title: "Analytics",
//     list: [
//       {
//         title: "Revenue",
//         path: "/admin/dashboard/revenue",
//         icon: <MdWork />,
//       },
//       {
//         title: "Reports",
//         path: "/admin/dashboard/reports",
//         icon: <MdAnalytics />,
//       },
//       {
//         title: "Teams",
//         path: "/admin/dashboard/teams",
//         icon: <MdPeople />,
//       },
//     ],
//   },
//   {
//     title: "User",
//     list: [
//       {
//         title: "Settings",
//         path: "/admin/dashboard/settings",
//         icon: <MdOutlineSettings />,
//       },
//       {
//         title: "Help",
//         path: "/admin/dashboard/help",
//         icon: <MdHelpCenter />,
//       },
//     ],
//   },
// ];

// const Sidebar = async () => {
//   // const { user } = await auth();
//   return (
//     <div className={styles.container}>
//       <div className={styles.user}>
//         <Image
//           className={styles.userImage}
//           src={user.img || "/noavatar.png"}
//           alt=""
//           width="50"
//           height="50"
//         />
//         <div className={styles.userDetail}>
//           <span className={styles.username}>{user.name}</span>
//           <span className={styles.userTitle}>Administrator</span>
//         </div>
//       </div>
//       <ul className={styles.list}>
//         {menuItems.map((cat) => (
//           <li key={cat.title}>
//             <span className={styles.cat}>{cat.title}</span>
//             {cat.list.map((item) => (
//               <MenuLink item={item} key={item.title} />
//             ))}
//           </li>
//         ))}
//       </ul>
//       {/* <form
//         action={async () => {
//           "use server";
//           await signOut();
//         }}
//       >
//         <button className={styles.logout}>
//           <MdLogout />
//           Logout
//         </button>
//       </form> */}
//     </div>
//   );
// };

//  export default Sidebar;
// import Image from "next/image";
// import MenuLink from "./menuLink/menuLink";
// import styles from "./sidebar.module.css";
// import {
//   MdDashboard,
//   MdSupervisedUserCircle,
//   MdShoppingBag,
//   MdAttachMoney,
//   MdWork,
//   MdAnalytics,
//   MdPeople,
//   MdOutlineSettings,
//   MdHelpCenter,
//   MdLogout,
// } from "react-icons/md";

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// const menuItems = [
//   {
//     title: "Pages",
//     list: [
//       { title: "Dashboard", path: "/admin/dashboard", icon: <MdDashboard /> },
//       { title: "Users", path: "/admin/dashboard/users", icon: <MdSupervisedUserCircle /> },
//       { title: "Products", path: "/admin/dashboard/products", icon: <MdShoppingBag /> },
//       { title: "Transactions", path: "/admin/dashboard/transactions", icon: <MdAttachMoney /> },
//     ],
//   },
//   {
//     title: "Analytics",
//     list: [
//       { title: "Revenue", path: "/admin/dashboard/revenue", icon: <MdWork /> },
//       { title: "Reports", path: "/admin/dashboard/reports", icon: <MdAnalytics /> },
//       { title: "Teams", path: "/admin/dashboard/teams", icon: <MdPeople /> },
//     ],
//   },
//   {
//     title: "User",
//     list: [
//       { title: "Settings", path: "/admin/dashboard/settings", icon: <MdOutlineSettings /> },
//       { title: "Help", path: "/admin/dashboard/help", icon: <MdHelpCenter /> },
//     ],
//   },
// ];

// const Sidebar = async () => {
//   const session = await getServerSession(authOptions);

//   if (!session?.user) return null;

//   const user = session.user;

//   return (
//     <div className={styles.container}>
//       <div className={styles.user}>
//         <Image
//           className={styles.userImage}
//           src={user.image || "/noavatar.png"}
//           alt="user"
//           width={50}
//           height={50}
//         />
//         <div className={styles.userDetail}>
//           <span className={styles.username}>{user.name}</span>
//           <span className={styles.userTitle}>Administrator</span>
//         </div>
//       </div>

//       <ul className={styles.list}>
//         {menuItems.map((cat) => (
//           <li key={cat.title}>
//             <span className={styles.cat}>{cat.title}</span>
//             {cat.list.map((item) => (
//               <MenuLink item={item} key={item.title} />
//             ))}
//           </li>
//         ))}
//       </ul>

//       {/* LOGOUT */}
//       <form action="/api/auth/signout" method="POST">
//         <button className={styles.logout}>
//           <MdLogout />
//           Logout
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Sidebar;
import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";

const menuItems = [
  {
    title: "Pricing plans",
    list: [
      { title: "Dashboard", path: "/admin/dashboard", icon: <MdDashboard /> },
      { title: "Users", path: "/admin/dashboard/users", icon: <MdSupervisedUserCircle /> },
      { title: "Sales", path: "/admin/dashboard/products", icon: <MdShoppingBag /> },
      { title: "Leads", path: "/admin/dashboard/transactions", icon: <MdAttachMoney /> },
    ],
  },
  {
    title: "Analytics",
    list: [
      { title: "Revenue", path: "/admin/dashboard/revenue", icon: <MdWork /> },
      { title: "Reports", path: "/admin/dashboard/reports", icon: <MdAnalytics /> },
      { title: "Teams", path: "/admin/dashboard/teams", icon: <MdPeople /> },
    ],
  },
  {
    title: "User",
    list: [
      { title: "Settings", path: "/admin/dashboard/settings", icon: <MdOutlineSettings /> },
      { title: "Help", path: "/admin/dashboard/help", icon: <MdHelpCenter /> },
    ],
  },
  {
    title: "Subscriptions",
    list: [
      { title: "Settings", path: "/admin/dashboard/settings", icon: <MdOutlineSettings /> },
      { title: "Help", path: "/admin/dashboard/help", icon: <MdHelpCenter /> },
    ],
  },
  {
    title: "Interview pricing",
    list: [
      { title: "Settings", path: "/admin/dashboard/settings", icon: <MdOutlineSettings /> },
      { title: "Help", path: "/admin/dashboard/help", icon: <MdHelpCenter /> },
    ],
  },
];

const Sidebar = () => {
  // 🔹 TEMP STATIC USER (no auth)
  const user = {
    name: "Admin",
    image: "/noavatar.png",
  };

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={user.image}
          alt="user"
          width={50}
          height={50}
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{user.name}</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>

      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink key={item.title} item={item} />
            ))}
          </li>
        ))}
      </ul>

      <button className={styles.logout}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
