/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/app/admin/ui/dashboard/pagination/pagination";
import SearchInput from "@/app/admin/ui/dashboard/search/search";
import styles from "@/app/admin/ui/dashboard/users/users.module.css";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

/* ================= FETCH LEADS ================= */
async function fetchLeads(q: string, page: number) {
  const res = await fetch(`${BASE_URL}/api/leads`, { cache: "no-store" });
  const leads = await res.json();

  const filtered = leads.filter(
    (l: any) =>
      l.name?.toLowerCase().includes(q.toLowerCase()) ||
      l.email?.toLowerCase().includes(q.toLowerCase()) ||
      l.phone?.includes(q)
  );

  const PAGE_SIZE = 5;
  const start = (page - 1) * PAGE_SIZE;

  return {
    count: filtered.length,
    leads: filtered.slice(start, start + PAGE_SIZE),
  };
}

export default function LeadsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";
  const page = Number(searchParams.get("page") || "1");

  const [leads, setLeads] = useState<any[]>([]);
  const [count, setCount] = useState(0);

  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [mode, setMode] = useState<"view" | "edit" | null>(null);

  useEffect(() => {
    fetchLeads(q, page).then(({ leads, count }) => {
      setLeads(leads);
      setCount(count);
    });
  }, [q, page]);

  /* ===== DELETE LEAD ===== */
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`${BASE_URL}/api/leads/${id}`, { method: "DELETE" });

    const { leads, count } = await fetchLeads(q, page);
    setLeads(leads);
    setCount(count);
  };

  /* ===== VIEW / EDIT LEAD ===== */
  const handleViewEdit = async (id: string, type: "view" | "edit") => {
    const res = await fetch(`${BASE_URL}/api/leads/${id}`);
    const data = await res.json();
    setSelectedLead(data);
    setMode(type);
  };

  const handleUpdate = async () => {
    await fetch(`${BASE_URL}/api/leads/${selectedLead._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: selectedLead.name,
        phone: selectedLead.phone,
        email: selectedLead.email,
        temperature: selectedLead.temperature,
        initialRemark: selectedLead.initialRemark,
      }),
    });

    const { leads, count } = await fetchLeads(q, page);
    setLeads(leads);
    setCount(count);
    setSelectedLead(null);
    setMode(null);
  };

  return (
    <div className={styles.container}>
      {/* TOP BAR */}
      <div className={styles.top}>
        <SearchInput initialQuery={q} />
        <button
          className={styles.addButton}
          onClick={() => router.push("/admin/dashboard/transactions/add")}
        >
          Add Lead
        </button>
      </div>

      {/* TABLE */}
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Phone</td>
            <td>Email</td>
            <td>Temperature</td>
            <td>Duplicate</td>
            <td>Created At</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {leads.map((l: any) => (
            <tr key={l._id}>
              <td>
                <div className={styles.user}>
                  <Image src="/noavatar.png" alt="Lead" width={40} height={40} />
                  {l.name}
                </div>
              </td>
              <td>{l.phone || "—"}</td>
              <td>{l.email || "—"}</td>
              <td>{l.temperature}</td>
              <td>{l.isDuplicate ? "Yes" : "No"}</td>
              <td>{new Date(l.createdAt).toDateString()}</td>
              <td>
                <div className={styles.buttons}>
                  <button onClick={() => handleViewEdit(l._id, "view")}>
                    View
                  </button>
                  <button onClick={() => handleViewEdit(l._id, "edit")}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(l._id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {leads.length === 0 && (
            <tr>
              <td colSpan={7} className={styles.empty}>
                No leads found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination count={count} />

      {/* MODAL */}
      {selectedLead && (
        <div className={styles.modal}>
          <h3>{mode === "view" ? "Lead Details" : "Edit Lead"}</h3>

          <input
            disabled={mode === "view"}
            value={selectedLead.name}
            onChange={(e) =>
              setSelectedLead({ ...selectedLead, name: e.target.value })
            }
          />

          <input
            disabled={mode === "view"}
            value={selectedLead.phone || ""}
            onChange={(e) =>
              setSelectedLead({ ...selectedLead, phone: e.target.value })
            }
          />

          <input
            disabled={mode === "view"}
            value={selectedLead.email || ""}
            onChange={(e) =>
              setSelectedLead({ ...selectedLead, email: e.target.value })
            }
          />

          <select
            disabled={mode === "view"}
            value={selectedLead.temperature}
            onChange={(e) =>
              setSelectedLead({ ...selectedLead, temperature: e.target.value })
            }
          >
            <option value="hot">Hot</option>
            <option value="warm">Warm</option>
            <option value="cold">Cold</option>
          </select>

          <textarea
            disabled={mode === "view"}
            placeholder="Initial Remark"
            value={selectedLead.initialRemark || ""}
            onChange={(e) =>
              setSelectedLead({
                ...selectedLead,
                initialRemark: e.target.value,
              })
            }
          />

          {mode === "edit" && (
            <button onClick={handleUpdate}>Update</button>
          )}

          <button
            onClick={() => {
              setSelectedLead(null);
              setMode(null);
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
