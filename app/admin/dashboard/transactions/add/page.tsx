"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/admin/ui/dashboard/users/addUser/addUser.module.css";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default function AddLeadPage() {
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
      source: (form.elements.namedItem("source") as HTMLInputElement).value,
      temperature: (form.elements.namedItem("temperature") as HTMLSelectElement)
        .value,
      statusTag: (form.elements.namedItem("statusTag") as HTMLInputElement)
        .value,
      initialRemark: (
        form.elements.namedItem("initialRemark") as HTMLTextAreaElement
      ).value,
      assignedTo: (
        form.elements.namedItem("assignedTo") as HTMLInputElement
      ).value,
      createdBy: (
        form.elements.namedItem("createdBy") as HTMLInputElement
      ).value,
      customFields: {}, // optional / can extend later
    };

    try {
      const res = await fetch(`${BASE_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || "Failed to create lead");
      } else {
        alert("Lead created successfully");
        form.reset();
        router.push("/admin/dashboard/leads");
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
      <h1 className={styles.title}>Add Lead</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input name="name" placeholder="Name *" required />
        <input name="phone" placeholder="Phone" />
        <input type="email" name="email" placeholder="Email" />

        <input name="source" placeholder="Source (Website, Call, Ads...)" />

        <select name="temperature" defaultValue="">
          <option value="" disabled>
            Select Temperature
          </option>
          <option value="hot">Hot</option>
          <option value="warm">Warm</option>
          <option value="cold">Cold</option>
        </select>

        <input name="statusTag" placeholder="Status Tag (New, Follow-up)" />

        <textarea
          name="initialRemark"
          placeholder="Initial Remark"
          rows={4}
        />

        <input name="assignedTo" placeholder="Assigned To (User ID)" />
        <input name="createdBy" placeholder="Created By (Admin ID)" />

        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? "Creating..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
