// import { addProduct } from "@/app/admin/lib/actions";
// import styles from "@/app/admin/ui/dashboard/products/addProduct/addProduct.module.css";

// const AddProductPage = () => {
//   return (
//     <div className={styles.container}>
//       <form action={addProduct} className={styles.form}>
//         <input type="text" placeholder="title" name="title" required />
//         <select name="cat" id="cat">
//           <option value="general">Choose a Category</option>
//           <option value="kitchen">Kitchen</option>
//           <option value="phone">Phone</option>
//           <option value="computer">Computer</option>
//         </select>
//         <input type="number" placeholder="price" name="price" required />
//         <input type="number" placeholder="stock" name="stock" required />
//         <input type="text" placeholder="color" name="color" />
//         <input type="text" placeholder="size" name="size" />
//         <textarea
//           required
//           name="desc"
//           id="desc"
//           rows="16"
//           placeholder="Description"
//         ></textarea>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default AddProductPage;
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/admin/ui/dashboard/users/addUser/addUser.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default function AddSalesPersonPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
      role: (form.elements.namedItem("role") as HTMLSelectElement).value,
    };

    try {
      const res = await fetch(`${BASE_URL}/api/sales`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || "Failed to add sales person");
      } else {
        alert("Sales person added successfully");
        form.reset();
        router.push("/admin/dashboard/sales");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add Sales Person</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" required />
        <input name="phone" placeholder="Phone" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />

        <select name="role" required defaultValue="">
          <option value="" disabled>
            Select Role
          </option>
          <option value="sales">Sales</option>
          <option value="manager">Manager</option>
        </select>

        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? "Adding..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
