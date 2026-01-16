// "use client";
// import { useState } from "react";
// import axios from "axios";

// export default function AddUser({
//   onSuccess,
// }: {
//   onSuccess: () => void;
// }) {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const submit = async () => {
//     if (!form.name || !form.email || !form.password) {
//       alert("All fields required");
//       return;
//     }

//     await axios.post("/api/users", form);
//     setForm({ name: "", email: "", password: "" });
//     onSuccess();
//   };

//   return (
//     <div className="bg-gray-100 p-4 rounded">
//       <h2 className="font-semibold mb-3">Add User</h2>

//       <div className="flex gap-2 flex-wrap">
//         <input
//           className="border p-2"
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <input
//           className="border p-2"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />

//         <input
//           className="border p-2"
//           placeholder="Password"
//           type="password"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         <button
//           onClick={submit}
//           className="bg-black text-white px-4 py-2 rounded"
//         >
//           Add
//         </button>
//       </div>
//     </div>
//   );
// }
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
      name: form.name.valueOf,
      email: form.email.valueOf,
      password: form.password.valueOf,
      //phone: form.phone.valueOf,
    //   address: form.address.value,
     // role: form.isAdmin.valueOf === "true",
    //   isActive: form.isActive.value === "true",
    };

    try {
      const res = await fetch(`${BASE_URL}/api/users/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || "Failed to add user");
      } else {
        alert("User added successfully!");
        form.reset();
        router.push("/admin/dashboard/users"); // redirect to users list
      }
    } catch (error) {
      console.error(error);
      alert("Server error, please try again");
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
        {/* <input type="tel" name="phone" placeholder="Phone" />
        <textarea name="address" placeholder="Address" rows={4}></textarea> */}

        {/* <select name="isAdmin" defaultValue="">
          <option value="" disabled>Is Admin?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select> */}

        {/* <select name="isActive" defaultValue="">
          <option value="" disabled>Is Active?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select> */}

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? "Adding..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
