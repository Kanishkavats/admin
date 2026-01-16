"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "@/app/admin/ui/dashboard/users/addUser/addUser.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  // 🔹 Load user by ID
  useEffect(() => {
    if (!id) return;

    fetch(`${BASE_URL}/api/users/${id}`)
      .then((res) => res.json())
      .then((data) =>
        setForm({
          name: data.name,
          email: data.email,
        })
      );
  }, [id]);

  // 🔹 Update user
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || "Update failed");
      } else {
        alert("User updated successfully");
        router.push(`/admin/dashboard/users/${id}`);
      }
    } catch {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Edit User</h1>

      <form className={styles.form} onSubmit={submit}>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          required
        />

        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
