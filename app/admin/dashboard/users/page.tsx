/* eslint-disable @typescript-eslint/no-explicit-any */
// import { deleteUser } from "@/app/admin//lib/actions";
// import { fetchUsers } from "@/app/admin/lib/data";
// import Pagination from "@/app/admin/ui/dashboard/pagination/pagination";
// import Search from "@/app/admin/ui/dashboard/search/search";
// import styles from "@/app/admin/ui/dashboard/users/users.module.css";
// import Image from "next/image";
// import Link from "next/link";

// const UsersPage = async ({ searchParams }) => {
//   const q = searchParams?.q || "";
//   const page = searchParams?.page || 1;
//   const { count, users } = await fetchUsers(q, page);

//   return (
//     <div className={styles.container}>
//       <div className={styles.top}>
//         <Search placeholder="Search for a user..." />
//         <Link href="/dashboard/users/add">
//           <button className={styles.addButton}>Add New</button>
//         </Link>
//       </div>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <td>Name</td>
//             <td>Email</td>
//             <td>Created At</td>
//             <td>Role</td>
//             <td>Status</td>
//             <td>Action</td>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>
//                 <div className={styles.user}>
//                   <Image
//                     src={user.img || "/noavatar.png"}
//                     alt=""
//                     width={40}
//                     height={40}
//                     className={styles.userImage}
//                   />
//                   {user.username}
//                 </div>
//               </td>
//               <td>{user.email}</td>
//               <td>{user.createdAt?.toString().slice(4, 16)}</td>
//               <td>{user.isAdmin ? "Admin" : "Client"}</td>
//               <td>{user.isActive ? "active" : "passive"}</td>
//               <td>
//                 <div className={styles.buttons}>
//                   <Link href={`/dashboard/users/${user.id}`}>
//                     <button className={`${styles.button} ${styles.view}`}>
//                       View
//                     </button>
//                   </Link>
//                   <form action={deleteUser}>
//                     <input type="hidden" name="id" value={(user.id)} />
//                     <button className={`${styles.button} ${styles.delete}`}>
//                       Delete
//                     </button>
//                   </form>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <Pagination count={count} />
//     </div>
//   );
// };

// export default UsersPage;
// import Pagination from "@/app/admin/ui/dashboard/pagination/pagination";
// import Search from "@/app/admin/ui/dashboard/search/search";
// import styles from "@/app/admin/ui/dashboard/users/users.module.css";
// import Image from "next/image";
// import Link from "next/link";

// /* ===== SERVER FETCH ===== */
// async function getUsers(q: string, page: number) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
//     { cache: "no-store" }
//   );

//   const users = await res.json();

//   // simple search
//   const filtered = users.filter((u: any) =>
//     u.name.toLowerCase().includes(q.toLowerCase()) ||
//     u.email.toLowerCase().includes(q.toLowerCase())
//   );

//   const PAGE_SIZE = 5;
//   const start = (page - 1) * PAGE_SIZE;
//   const end = start + PAGE_SIZE;

//   return {
//     count: filtered.length,
//     users: filtered.slice(start, end),
//   };
// }

// /* ===== SERVER ACTION DELETE ===== */
// async function deleteUserAction(formData: FormData) {
//   "use server";
//   const id = formData.get("id");

//   await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`,
//     {
//       method: "DELETE",
//     }
//   );
// }

// const UsersPage = async ({ searchParams }: any) => {
//   const q = searchParams?.q || "";
//   const page = Number(searchParams?.page) || 1;

//   const { count, users } = await getUsers(q, page);

//   return (
//     <div className={styles.container}>
//       {/* ===== TOP BAR ===== */}
//       <div className={styles.top}>
//         <Search placeholder="Search for a user..." />
//         <Link href="/admin/dashboard/users/add">
//           <button className={styles.addButton}>Add New</button>
//         </Link>
//       </div>

//       {/* ===== TABLE ===== */}
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <td>Name</td>
//             <td>Email</td>
//             <td>Created At</td>
//             <td>Role</td>
//             <td>Status</td>
//             <td>Action</td>
//           </tr>
//         </thead>

//         <tbody>
//           {users.map((user: any) => (
//             <tr key={user._id}>
//               <td>
//                 <div className={styles.user}>
//                   <Image
//                     src="/noavatar.png"
//                     alt=""
//                     width={40}
//                     height={40}
//                     className={styles.userImage}
//                   />
//                   {user.name}
//                 </div>
//               </td>

//               <td>{user.email}</td>

//               <td>
//                 {user.createdAt
//                   ? new Date(user.createdAt).toDateString()
//                   : "—"}
//               </td>

//               <td>Client</td>
//               <td>active</td>

//               <td>
//                 <div className={styles.buttons}>
//                   <Link href={`/admin/dashboard/users/${user._id}`}>
//                     <button className={`${styles.button} ${styles.view}`}>
//                       View
//                     </button>
//                   </Link>

//                   <form action={deleteUserAction}>
//                     <input type="hidden" name="id" value={user._id} />
//                     <button className={`${styles.button} ${styles.delete}`}>
//                       Delete
//                     </button>
//                   </form>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <Pagination count={count} />
//     </div>
//   );
// };

// export default UsersPage;
// app/admin/dashboard/users/page.tsx
// import Pagination from "@/app/admin/ui/dashboard/pagination/pagination";
// import Search from "@/app/admin/ui/dashboard/search/search";
// import styles from "@/app/admin/ui/dashboard/users/users.module.css";
// import Image from "next/image";
// import Link from "next/link";
// import { revalidatePath } from "next/cache";

// /* ===== SERVER FETCH ===== */
// async function getUsers(q: string, page: number) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
//     cache: "no-store",
//   });
//   const users = await res.json();

//   const filtered = users.filter(
//     (u: any) =>
//       u.name.toLowerCase().includes(q.toLowerCase()) ||
//       u.email.toLowerCase().includes(q.toLowerCase())
//   );

//   const PAGE_SIZE = 5;
//   const start = (page - 1) * PAGE_SIZE;
//   const end = start + PAGE_SIZE;

//   return {
//     count: filtered.length,
//     users: filtered.slice(start, end),
//   };
// }

// /* ===== SERVER ACTION DELETE ===== */
// async function deleteUserAction(formData: FormData) {
//   "use server";
//   const id = formData.get("id");

//   await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`, {
//     method: "DELETE",
//   });

//   // Optionally revalidate this page so UI updates
//   revalidatePath("/admin/dashboard/users");
// }

// const UsersPage = async ({ searchParams }: any) => {
//   const q = searchParams?.q || "";
//   const page = Number(searchParams?.page) || 1;

//   const { count, users } = await getUsers(q, page);

//   return (
//     <div className={styles.container}>
//       {/* ===== TOP BAR ===== */}
//       <div className={styles.top}>
//         <Search placeholder="Search for a user..." />
//         <Link href="/admin/dashboard/users/add">
//           <button className={styles.addButton}>Add New</button>
//         </Link>
//       </div>

//       {/* ===== TABLE ===== */}
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <td>Name</td>
//             <td>Email</td>
//             <td>Created At</td>
//             <td>Role</td>
//             <td>Status</td>
//             <td>Action</td>
//           </tr>
//         </thead>

//         <tbody>
//           {users.map((user: any) => (
//             <tr key={user._id}>
//               <td>
//                 <div className={styles.user}>
//                   <Image
//                     src="/noavatar.png"
//                     alt=""
//                     width={40}
//                     height={40}
//                     className={styles.userImage}
//                   />
//                   {user.name}
//                 </div>
//               </td>

//               <td>{user.email}</td>

//               <td>{user.createdAt ? new Date(user.createdAt).toDateString() : "—"}</td>

//               <td>Client</td>
//               <td>active</td>

//               <td>
//                 <div className={styles.buttons}>
//                   <Link href={`/admin/dashboard/users/${user._id}`}>
//                     <button className={`${styles.button} ${styles.view}`}>View</button>
//                   </Link>

//                   <form action={deleteUserAction}>
//                     <input type="hidden" name="id" value={user._id} />
//                     <button className={`${styles.button} ${styles.delete}`}>Delete</button>
//                   </form>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <Pagination count={count} />
//     </div>
//   );
// };

// export default UsersPage;
//app/admin/dashboard/users/page.tsx
// "use client"
// import Pagination from "@/app/admin/ui/dashboard/pagination/pagination";
// import styles from "@/app/admin/ui/dashboard/users/users.module.css";
// import Image from "next/image";
// import Link from "next/link";
// //import { revalidatePath } from "next/cache";
// import SearchInput from "@/app/admin/ui/dashboard/search/search"; // We'll create this below

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// /* ===== SERVER FETCH ===== */
// async function getUsers(q: string, page: number) {
//   const res = await fetch(`${BASE_URL}/api/users`, { cache: "no-store" });
//   const users = await res.json();

//   const filtered = users.filter(
//     (u: any) =>
//       u.name.toLowerCase().includes(q.toLowerCase()) ||
//       u.email.toLowerCase().includes(q.toLowerCase())
//   );

//   const PAGE_SIZE = 5;
//   const start = (page - 1) * PAGE_SIZE;
//   const end = start + PAGE_SIZE;

//   return {
//     count: filtered.length,
//     users: filtered.slice(start, end),
//   };
// }

// /* ===== SERVER ACTION DELETE ===== */
// // async function deleteUserAction(formData: FormData) {
// //   // "use server";
// //   const id = formData.get("id");
// //   if (!id) return;

// //   await fetch(`${BASE_URL}/api/users/${id}`, { method: "DELETE" });
// //   revalidatePath("/admin/dashboard/users");
// // }
// const handleDelete = async (id: string) => {
//   await fetch(`${BASE_URL}/api/users/${id}`, { method: "DELETE" });
//   const { users, count } = await getUsers(q, page);
//   setUsers(users);
//   setCount(count);
// };

// /* ===== USERS PAGE ===== */
// export default async function UsersPage({
//   searchParams,
// }: {
//   searchParams?: { q?: string; page?: string };
// }) {
//   const q = searchParams?.q || "";
//   const page = Number(searchParams?.page) || 1;

//   const { count, users } = await getUsers(q, page);

//   return (
//     <div className={styles.container}>
//       {/* ===== TOP BAR ===== */}
//       <div className={styles.top}>
//         <SearchInput initialQuery={q} />
//         <Link href="/admin/dashboard/users/add">
//           <button className={styles.addButton}>Add New</button>
//         </Link>
//       </div>

//       {/* ===== TABLE ===== */}
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <td>Name</td>
//             <td>Email</td>
//             <td>Created At</td>
//             <td>Role</td>
//             <td>Status</td>
//             <td>Action</td>
//           </tr>
//         </thead>

//         <tbody>
//           {users.map((user: any) => (
//             <tr key={user._id}>
//               <td>
//                 <div className={styles.user}>
//                   <Image
//                     src="/noavatar.png"
//                     alt="User Avatar"
//                     width={40}
//                     height={40}
//                     className={styles.userImage}
//                   />
//                   {user.name}
//                 </div>
//               </td>

//               <td>{user.email}</td>

//               <td>{user.createdAt ? new Date(user.createdAt).toDateString() : "—"}</td>

//               <td>Client</td>
//               <td>active</td>

//               <td>
//                 <div className={styles.buttons}>
//                   <Link href={`/admin/dashboard/users/${user._id}`}>
//                     <button className={`${styles.button} ${styles.view}`}>View</button>
//                   </Link>

//                   <button
//                     className={`${styles.button} ${styles.delete}`}
//                        onClick={() => handleDelete(user._id)}
//                               >
//                              Delete
//                   </button>


                  
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* ===== PAGINATION ===== */}
//       <Pagination count={count} />
//     </div>
//   );
//}
// "use client";

// import { useEffect, useState } from "react";
// import Pagination from "@/app/admin/ui/dashboard/pagination/pagination";
// import SearchInput from "@/app/admin/ui/dashboard/search/search";
// import styles from "@/app/admin/ui/dashboard/users/users.module.css";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// async function fetchUsers(q: string, page: number) {
//   const res = await fetch(`${BASE_URL}/api/users`, { cache: "no-store" });
//   const users = await res.json();

//   const filtered = users.filter(
//     (u: any) =>
//       u.name?.toLowerCase().includes(q.toLowerCase()) ||
//       u.email?.toLowerCase().includes(q.toLowerCase())
//   );

//   const PAGE_SIZE = 5;
//   const start = (page - 1) * PAGE_SIZE;
//   return {
//     count: filtered.length,
//     users: filtered.slice(start, start + PAGE_SIZE),
//   };
// }

// export default function UsersPage({ searchParams }: { searchParams?: { q?: string; page?: string } }) {
//   const router = useRouter();
//   const q = searchParams?.q || "";
//   const page = Number(searchParams?.page) || 1;

//   const [users, setUsers] = useState<any[]>([]);
//   const [count, setCount] = useState(0);

//   /* View/Edit modal state */
//   const [selectedUser, setSelectedUser] = useState<any>(null);
//   const [mode, setMode] = useState<"view" | "edit" | null>(null);

//   useEffect(() => {
//     fetchUsers(q, page).then(({ users, count }) => {
//       setUsers(users);
//       setCount(count);
//     });
//   }, [q, page]);

//   /* ===== DELETE USER ===== */
//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this user?")) return;
//     await fetch(`${BASE_URL}/api/users/${id}`, { method: "DELETE" });
//     const { users, count } = await fetchUsers(q, page);
//     setUsers(users);
//     setCount(count);
//   };

//   /* ===== VIEW / EDIT USER ===== */
//   const handleViewEdit = async (id: string, type: "view" | "edit") => {
//     const res = await fetch(`${BASE_URL}/api/users/${id}`);
//     const data = await res.json();
//     setSelectedUser(data);
//     setMode(type);
//   };

//   const handleUpdate = async () => {
//     await fetch(`${BASE_URL}/api/users/${selectedUser._id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(selectedUser),
//     });

//     const { users, count } = await fetchUsers(q, page);
//     setUsers(users);
//     setCount(count);
//     setSelectedUser(null);
//     setMode(null);
//   };

//   return (
//     <div className={styles.container}>
//       {/* Top bar */}
//       <div className={styles.top}>
//         <SearchInput initialQuery={q} />
//         <button className={styles.addButton} onClick={() => router.push("/admin/dashboard/users/add")}>
//           Add New
//         </button>
//       </div>

//       {/* Users table */}
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <td>Name</td>
//             <td>Email</td>
//             <td>Created At</td>
//             <td>Role</td>
//             <td>Status</td>
//             <td>Action</td>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user: any) => (
//             <tr key={user._id}>
//               <td>
//                 <div className={styles.user}>
//                   <Image src="/noavatar.png" alt="User" width={40} height={40} />
//                   {user.name}
//                 </div>
//               </td>
//               <td>{user.email}</td>
//               <td>{user.createdAt ? new Date(user.createdAt).toDateString() : "—"}</td>
//               <td>{user.role || "Client"}</td>
//               <td>Active</td>
//               <td>
//                 <div className={styles.buttons}>
//                   <button className={`${styles.button} ${styles.view}`} onClick={() => handleViewEdit(user._id, "view")}>
//                     View
//                   </button>
//                   <button className={`${styles.button} ${styles.view}`} onClick={() => handleViewEdit(user._id, "edit")}>
//                     Edit
//                   </button>
//                   <button className={`${styles.button} ${styles.delete}`} onClick={() => handleDelete(user._id)}>
//                     Delete
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <Pagination count={count} />

//       {/* Modal */}
//       {selectedUser && (
//         <div className={styles.modal}>
//           <h3>{mode === "view" ? "User Details" : "Edit User"}</h3>
//           <input
//             disabled={mode === "view"}
//             value={selectedUser.name}
//             onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
//           />
//           <input
//             disabled={mode === "view"}
//             value={selectedUser.email}
//             onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
//           />
//           {mode === "edit" && (
//             <button onClick={handleUpdate}>Update</button>
//           )}
//           <button onClick={() => { setSelectedUser(null); setMode(null); }}>Close</button>
//         </div>
//       )}
//     </div>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import Pagination from "@/app/admin/ui/dashboard/pagination/pagination";
// import SearchInput from "@/app/admin/ui/dashboard/search/search";
// import styles from "@/app/admin/ui/dashboard/users/users.module.css";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Link } from "lucide-react";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// export default function UsersClient({
//   searchParams,
// }: {
//   searchParams?: { q?: string; page?: string };
// }) {
//   const router = useRouter();
//   const q = searchParams?.q || "";
//   const page = Number(searchParams?.page) || 1;

//   const [users, setUsers] = useState<any[]>([]);
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     fetch(`${BASE_URL}/api/users`)
//       .then((res) => res.json())
//       .then((data) => {
//         const filtered = data.filter(
//           (u: any) =>
//             u.name?.toLowerCase().includes(q.toLowerCase()) ||
//             u.email?.toLowerCase().includes(q.toLowerCase())
//         );

//         const PAGE_SIZE = 5;
//         const start = (page - 1) * PAGE_SIZE;
//         setUsers(filtered.slice(start, start + PAGE_SIZE));
//         setCount(filtered.length);
//       });
//   }, [q, page]);

//   return (
//     <div className={styles.container}>
//       <div className={styles.top}>
//         <SearchInput initialQuery={q} />
//         <button
//           className={styles.addButton}
//           onClick={() => router.push("/admin/dashboard/users/AddUser")}
//         >
//           Add New
//         </button>
//       </div>

//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <td>Name</td>
//             <td>Email</td>
//             <td>Created</td>
//             <td>Action</td>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user: any) => (
//             <tr key={user._id}>
//               <td>
//                 <div className={styles.user}>
//                   <Image src="/noavatar.png" alt="" width={40} height={40} />
//                   {user.name}
//                 </div>
//               </td>
//               <td>{user.email}</td>
//               <td>{new Date(user.createdAt).toDateString()}</td>
//               {/* <td>
//                 <button onClick={() => alert(user._id)}>View</button>
//               </td>
//                */}

//                <Link href={`/admin/dashboard/users/${user._id}`}>
//                  <button className={styles.view}>View</button>
//                </Link>

//                 <Link href={`/admin/dashboard/users/${user._id}/edit`}>
//                    <button className={styles.edit}>Edit</button>
//                 </Link>

//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <Pagination count={count} />
//     </div>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import Pagination from "@/app/admin/ui/dashboard/pagination/pagination";
// import SearchInput from "@/app/admin/ui/dashboard/search/search";
// import styles from "@/app/admin/ui/dashboard/users/users.module.css";
// import Image from "next/image";
// import { useRouter, useSearchParams } from "next/navigation";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// /* ================= FETCH USERS ================= */
// async function fetchUsers(q: string, page: number) {
//   const res = await fetch(`${BASE_URL}/api/users`, { cache: "no-store" });
//   const users = await res.json();

//   const filtered = users.filter(
//     (u: any) =>
//       u.name?.toLowerCase().includes(q.toLowerCase()) ||
//       u.email?.toLowerCase().includes(q.toLowerCase())
//   );

//   const PAGE_SIZE = 5;
//   const start = (page - 1) * PAGE_SIZE;

//   return {
//     count: filtered.length,
//     users: filtered.slice(start, start + PAGE_SIZE),
//   };
// }

// export default function UsersPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams(); // ✅ Next.js 16 way

//   const q = searchParams.get("q") || "";
//   const page = Number(searchParams.get("page") || "1");

//   const [users, setUsers] = useState<any[]>([]);
//   const [count, setCount] = useState(0);

//   /* View / Edit modal */
//   const [selectedUser, setSelectedUser] = useState<any>(null);
//   const [mode, setMode] = useState<"view" | "edit" | null>(null);

//   useEffect(() => {
//     fetchUsers(q, page).then(({ users, count }) => {
//       setUsers(users);
//       setCount(count);
//     });
//   }, [q, page]);

//   /* ================= DELETE ================= */
//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure?")) return;

//     await fetch(`${BASE_URL}/api/users/${id}`, { method: "DELETE" });
//     const { users, count } = await fetchUsers(q, page);
//     setUsers(users);
//     setCount(count);
//   };

//   /* ================= VIEW / EDIT ================= */
//   const handleViewEdit = async (id: string, type: "view" | "edit") => {
//     const res = await fetch(`${BASE_URL}/api/users/${id}/edit`);
//     const data = await res.json();
//     setSelectedUser(data);
//     setMode(type);
//   };

//   const handleUpdate = async () => {
//     await fetch(`${BASE_URL}/api/users/${selectedUser._id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name: selectedUser.name,
//         email: selectedUser.email,
//       }),
//     });

//     const { users, count } = await fetchUsers(q, page);
//     setUsers(users);
//     setCount(count);
//     setSelectedUser(null);
//     setMode(null);
//   };

//   return (
//     <div className={styles.container}>
//       {/* ===== TOP BAR ===== */}
//       <div className={styles.top}>
//         <SearchInput initialQuery={q} />
//         <button
//           className={styles.addButton}
//           onClick={() => router.push("/admin/dashboard/users/AddUser")}
//         >
//           Add New
//         </button>
//       </div>

//       {/* ===== TABLE ===== */}
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <td>Name</td>
//             <td>Email</td>
//             <td>Created At</td>
//             <td>Role</td>
//             <td>Status</td>
//             <td>Action</td>
//           </tr>
//         </thead>

//         <tbody>
//           {users.map((user: any) => (
//             <tr key={user._id}>
//               <td>
//                 <div className={styles.user}>
//                   <Image src="/noavatar.png" alt="User" width={40} height={40} />
//                   {user.name}
//                 </div>
//               </td>

//               <td>{user.email}</td>
//               <td>{user.createdAt ? new Date(user.createdAt).toDateString() : "—"}</td>
//               <td>{user.role || "Client"}</td>
//               <td>Active</td>

//               <td>
//                 <div className={styles.buttons}>
//                   <button onClick={() => handleViewEdit(user._id, "view")} className={styles.view}>
//                     View
//                   </button>
//                   <button onClick={() => handleViewEdit(user._id, "edit")} className={styles.view}>
//                     Edit
//                   </button>
//                   <button onClick={() => handleDelete(user._id)} className={styles.delete}>
//                     Delete
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <Pagination count={count} />

//       {/* ===== MODAL ===== */}
//       {selectedUser && (
//         <div className={styles.modal}>
//           <h3>{mode === "view" ? "User Details" : "Edit User"}</h3>

//           <input
//             disabled={mode === "view"}
//             value={selectedUser.name}
//             onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
//           />

//           <input
//             disabled={mode === "view"}
//             value={selectedUser.email}
//             onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
//           />

//           {mode === "edit" && <button onClick={handleUpdate}>Update</button>}
//           <button onClick={() => { setSelectedUser(null); setMode(null); }}>Close</button>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/app/admin/ui/dashboard/pagination/pagination";
import SearchInput from "@/app/admin/ui/dashboard/search/search";
import styles from "@/app/admin/ui/dashboard/users/users.module.css";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

/* ================= FETCH USERS ================= */
async function fetchUsers(q: string, page: number) {
  const res = await fetch(`${BASE_URL}/api/users`, { cache: "no-store" });
  const users = await res.json();

  const filtered = users.filter(
    (u: any) =>
      u.name?.toLowerCase().includes(q.toLowerCase()) ||
      u.email?.toLowerCase().includes(q.toLowerCase())
  );

  const PAGE_SIZE = 5;
  const start = (page - 1) * PAGE_SIZE;

  return {
    count: filtered.length,
    users: filtered.slice(start, start + PAGE_SIZE),
  };
}

export default function UsersClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";
  const page = Number(searchParams.get("page") || "1");

  const [users, setUsers] = useState<any[]>([]);
  const [count, setCount] = useState(0);

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [mode, setMode] = useState<"view" | "edit" | null>(null);

  useEffect(() => {
    fetchUsers(q, page).then(({ users, count }) => {
      setUsers(users);
      setCount(count);
    });
  }, [q, page]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`${BASE_URL}/api/users/${id}`, { method: "DELETE" });
    const { users, count } = await fetchUsers(q, page);
    setUsers(users);
    setCount(count);
  };

  const handleViewEdit = async (id: string, type: "view" | "edit") => {
    const res = await fetch(`${BASE_URL}/api/users/${id}`);
    const data = await res.json();
    setSelectedUser(data);
    setMode(type);
  };

  const handleUpdate = async () => {
    await fetch(`${BASE_URL}/api/users/${selectedUser._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: selectedUser.name,
        email: selectedUser.email,
      }),
    });

    const { users, count } = await fetchUsers(q, page);
    setUsers(users);
    setCount(count);
    setSelectedUser(null);
    setMode(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <SearchInput initialQuery={q} />
        <button
          className={styles.addButton}
          onClick={() => router.push("/admin/dashboard/users/add")}
        >
          Add New
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td>
                <div className={styles.user}>
                  <Image src="/noavatar.png" alt="User" width={40} height={40} />
                  {user.name}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.createdAt ? new Date(user.createdAt).toDateString() : "—"}</td>
              <td>{user.role || "Client"}</td>
              <td>Active</td>
              <td>
                <div className={styles.buttons}>
                  <button onClick={() => handleViewEdit(user._id, "view")}>View</button>
                  <button onClick={() => handleViewEdit(user._id, "edit")}>Edit</button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination count={count} />

      {selectedUser && (
        <div className={styles.modal}>
          <h3>{mode === "view" ? "User Details" : "Edit User"}</h3>

          <input
            disabled={mode === "view"}
            value={selectedUser.name}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, name: e.target.value })
            }
          />

          <input
            disabled={mode === "view"}
            value={selectedUser.email}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, email: e.target.value })
            }
          />

          {mode === "edit" && <button onClick={handleUpdate}>Update</button>}
          <button onClick={() => { setSelectedUser(null); setMode(null); }}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
