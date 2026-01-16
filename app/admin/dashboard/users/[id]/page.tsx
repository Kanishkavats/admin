// import { updateUser } from "@/app/admin/lib/actions";
// import { fetchUser } from "@/app/admin/lib/data";
// import styles from "@/app/admin/ui/dashboard/users/singleUser/singleUser.module.css";
// import Image from "next/image";

// const SingleUserPage = async ({ params }) => {
  
//   const { id } = params;
//   const user = await fetchUser(id);

//   return (
//     <div className={styles.container}>
//       <div className={styles.infoContainer}>
//         <div className={styles.imgContainer}>
//           <Image src={user.img || "/noavatar.png"} alt="" fill />
//         </div>
//         {user.username}
//       </div>
//       <div className={styles.formContainer}>
//         <form action={updateUser} className={styles.form}>
//           <input type="hidden" name="id" value={user.id}/>
//           <label>Username</label>
//           <input type="text" name="username" placeholder={user.username} />
//           <label>Email</label>
//           <input type="email" name="email" placeholder={user.email} />
//           <label>Password</label>
//           <input type="password" name="password" />
//           <label>Phone</label>
//           <input type="text" name="phone" placeholder={user.phone} />
//           <label>Address</label>
//           <textarea type="text" name="address" placeholder={user.address} />
//           <label>Is Admin?</label>
//           <select name="isAdmin" id="isAdmin">
//             <option value={true} selected={user.isAdmin}>Yes</option>
//             <option value={false} selected={!user.isAdmin}>No</option>
//           </select>
//           <label>Is Active?</label>
//           <select name="isActive" id="isActive">
//             <option value={true} selected={user.isActive}>Yes</option>
//             <option value={false} selected={!user.isActive}>No</option>
//           </select>
//           <button>Update</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SingleUserPage;
// import Image from "next/image";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import styles from "@/app/admin/ui/dashboard/users/singleUser/singleUser.module.css";

// const BASE_URL =
//   process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// /* ===== GET USER ===== */
// async function getUserById(id: string) {
//   const res = await fetch(`${BASE_URL}/api/users/${id}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) throw new Error("User not found");
//   return res.json();
// }

// /* ===== UPDATE USER ===== */
// async function updateUserAction(formData: FormData) {
//   "use server";

//   const id = formData.get("id") as string;

//   await fetch(`${BASE_URL}/api/users/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       name: formData.get("name"),
//       email: formData.get("email"),
//       role: formData.get("role"),
//     }),
//   });

//   revalidatePath("/admin/dashboard/users");
//   redirect("/admin/dashboard/users");
// }

// /* ===== PAGE ===== */
// export default async function SingleUserPage({
//   params,
//   searchParams,
// }: {
//   params: { id: string };
//   searchParams?: { mode?: string };
// }) {
//   const user = await getUserById(params.id);
//   const isEdit = searchParams?.mode === "edit";

//   return (
//     <div className={styles.container}>
//       {/* VIEW MODE */}
//       {!isEdit && (
//         <>
//           <Image src="/noavatar.png" alt="User" width={80} height={80} />
//           <p><b>Name:</b> {user.name}</p>
//           <p><b>Email:</b> {user.email}</p>
//           <p><b>Role:</b> {user.role}</p>

//           <a href={`?mode=edit`} className={styles.editBtn}>
//             Edit User
//           </a>
//         </>
//       )}

//       {/* EDIT MODE */}
//       {isEdit && (
//         <form action={updateUserAction} className={styles.form}>
//           <input type="hidden" name="id" value={user._id} />

//           <label>Name</label>
//           <input name="name" defaultValue={user.name} />

//           <label>Email</label>
//           <input name="email" defaultValue={user.email} />

//           <label>Role</label>
//           <select name="role" defaultValue={user.role}>
//             <option value="admin">Admin</option>
//             <option value="client">Client</option>
//           </select>

//           <button>Update</button>
//         </form>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "@/app/admin/ui/dashboard/users/viewUser/viewUser.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default function ViewUserPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`${BASE_URL}/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className={styles.container}>
      <h1>User Details</h1>

      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Role:</b> {user.role || "Client"}</p>

      <div className={styles.actions}>
        <button onClick={() => router.push(`/admin/dashboard/users/${id}/edit`)}>
          Edit
        </button>

        <button onClick={() => router.back()}>
          Back
        </button>
      </div>
    </div>
  );
}
