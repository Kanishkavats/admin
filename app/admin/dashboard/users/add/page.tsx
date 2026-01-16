// import { addUser } from "@/app/admin/lib/actions";
// import styles from "@/app/ui/admin/dashboard/users/addUser/addUser.module.css";

// const AddUserPage = () => {
//   return (
//     <div className={styles.container}>
//       <form action={addUser} className={styles.form}>
//         <input type="text" placeholder="username" name="username" required />
//         <input type="email" placeholder="email" name="email" required />
//         <input
//           type="password"
//           placeholder="password"
//           name="password"
//           required
//         />
//         <input type="phone" placeholder="phone" name="phone" />
//         <select name="isAdmin" id="isAdmin">
//           <option value={false}>
//             Is Admin?
//           </option>
//           <option value={true}>Yes</option>
//           <option value={false}>No</option>
//         </select>
//         <select name="isActive" id="isActive">
//           <option value={true}>
//             Is Active?
//           </option>
//           <option value={true}>Yes</option>
//           <option value={false}>No</option>
//         </select>
//         <textarea
//           name="address"
//           id="address"
//           rows="16"
//           placeholder="Address"
//         ></textarea>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default AddUserPage;
// "use client";

// import styles from "@/app/admin/ui/dashboard/users/addUser/addUser.module.css";

// const AddUserPage = () => {
//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Add New User</h1>

//       <form
//         className={styles.form}
//         onSubmit={async (e) => {
//           e.preventDefault();
//           const form = e.currentTarget;
//           const data = {
//             name: form.name.value,
//             email: form.email.value,
//             password: form.password.value,
//             phone: form.phone.value,
//             address: form.address.value,
//             isAdmin: form.isAdmin.value === "true",
//             isActive: form.isActive.value === "true",
//           };

//           const res = await fetch("/api/users", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(data),
//           });

//           const result = await res.json();
//           if (res.ok) {
//             alert("User added successfully");
//             form.reset();
//           } else {
//             alert(result.error);
//           }
//         }}
//       >
//         <input type="text" name="name" placeholder="Username" required />
//         <input type="email" name="email" placeholder="Email" required />
//         <input type="password" name="password" placeholder="Password" required />
//         <input type="tel" name="phone" placeholder="Phone" />
//         <textarea name="address" placeholder="Address" rows={4}></textarea>

//         <select name="isAdmin" defaultValue="">
//           <option value="" disabled>
//             Is Admin?
//           </option>
//           <option value="true">Yes</option>
//           <option value="false">No</option>
//         </select>

//         <select name="isActive" defaultValue="">
//           <option value="" disabled>
//             Is Active?
//           </option>
//           <option value="true">Yes</option>
//           <option value="false">No</option>
//         </select>

//         <button type="submit" className={styles.submitButton}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddUserPage;
"use client";

import { useState } from "react";
import styles from "@/app/admin/ui/dashboard/users/addUser/addUser.module.css";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const AddUserPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    const data = {
      name: form.name.value,       // ✅ FIXED
      email: form.email.value,     // ✅ FIXED
      password: form.password.value,
    };

    try {
      const res = await fetch(`${BASE_URL}/api/users/add`, { // ✅ FIXED URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || "Failed to add user");
      } else {
        alert("User added successfully");
        form.reset();
        router.push("/admin/dashboard/users");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New User</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Username" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />

        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? "Adding..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import styles from "@/app/admin/ui/dashboard/users/addUser/addUser.module.css";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// export default function AddUserPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     const form = e.currentTarget;
//     const data = {
//       name: form.name.value,
//       email: form.email.value,
//       password: form.password.value,
//     };

//     try {
//       const res = await fetch(`${BASE_URL}/api/users/add`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       const result = await res.json();
//       if (!res.ok) {
//         alert(result.error || "Failed to add user");
//       } else {
//         alert("User added successfully");
//         form.reset();
//         router.push("/admin/dashboard/users");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Add New User</h1>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Username" required />
//         <input type="email" name="email" placeholder="Email" required />
//         <input type="password" name="password" placeholder="Password" required />
//         <button type="submit" disabled={loading} className={styles.submitButton}>
//           {loading ? "Adding..." : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// }
