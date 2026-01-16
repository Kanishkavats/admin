// import Image from "next/image";
// import Link from "next/link";
// import styles from "@/app/admin/ui/dashboard/products/products.module.css";
// import Search from "@/app/admin/ui/dashboard/search/search";
// import Pagination from "@/app/admin/ui/dashboard/pagination/pagination";
// import { fetchProducts } from "@/app/admin/lib/data";
// import { deleteProduct } from "@/app/admin/lib/actions";

// const ProductsPage = async ({ searchParams }) => {
//   const q = searchParams?.q || "";
//   const page = searchParams?.page || 1;
//   const { count, products } = await fetchProducts(q, page);

//   return (
//     <div className={styles.container}>
//       <div className={styles.top}>
//         <Search placeholder="Search for a product..." />
//         <Link href="/dashboard/products/add">
//           <button className={styles.addButton}>Add New</button>
//         </Link>
//       </div>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <td>Title</td>
//             <td>Description</td>
//             <td>Price</td>
//             <td>Created At</td>
//             <td>Stock</td>
//             <td>Action</td>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id}>
//               <td>
//                 <div className={styles.product}>
//                   <Image
//                     src={product.img || "/noproduct.jpg"}
//                     alt=""
//                     width={40}
//                     height={40}
//                     className={styles.productImage}
//                   />
//                   {product.title}
//                 </div>
//               </td>
//               <td>{product.desc}</td>
//               <td>${product.price}</td>
//               <td>{product.createdAt?.toString().slice(4, 16)}</td>
//               <td>{product.stock}</td>
//               <td>
//                 <div className={styles.buttons}>
//                   <Link href={`/dashboard/products/${product.id}`}>
//                     <button className={`${styles.button} ${styles.view}`}>
//                       View
//                     </button>
//                   </Link>
//                   <form action={deleteProduct}>
//                     <input type="hidden" name="id" value={product.id} />
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

// export default ProductsPage;
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/app/admin/ui/dashboard/pagination/pagination";
import SearchInput from "@/app/admin/ui/dashboard/search/search";
import styles from "@/app/admin/ui/dashboard/users/users.module.css";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

/* ================= FETCH SALES ================= */
async function fetchSales(q: string, page: number) {
  const res = await fetch(`${BASE_URL}/api/sales`, { cache: "no-store" });
  const sales = await res.json();

  const filtered = sales.filter(
    (s: any) =>
      s.name?.toLowerCase().includes(q.toLowerCase()) ||
      s.email?.toLowerCase().includes(q.toLowerCase()) ||
      s.phone?.includes(q)
  );

  const PAGE_SIZE = 5;
  const start = (page - 1) * PAGE_SIZE;

  return {
    count: filtered.length,
    sales: filtered.slice(start, start + PAGE_SIZE),
  };
}

export default function SalesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";
  const page = Number(searchParams.get("page") || "1");

  const [sales, setSales] = useState<any[]>([]);
  const [count, setCount] = useState(0);

  const [selectedSales, setSelectedSales] = useState<any>(null);
  const [mode, setMode] = useState<"view" | "edit" | null>(null);

  useEffect(() => {
    fetchSales(q, page).then(({ sales, count }) => {
      setSales(sales);
      setCount(count);
    });
  }, [q, page]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`${BASE_URL}/api/sales/${id}`, { method: "DELETE" });

    const { sales, count } = await fetchSales(q, page);
    setSales(sales);
    setCount(count);
  };

  const handleViewEdit = async (id: string, type: "view" | "edit") => {
    const res = await fetch(`${BASE_URL}/api/sales/${id}`);
    const data = await res.json();
    setSelectedSales(data);
    setMode(type);
  };

  const handleUpdate = async () => {
    await fetch(`${BASE_URL}/api/sales/${selectedSales._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: selectedSales.name,
        phone: selectedSales.phone,
        email: selectedSales.email,
        role: selectedSales.role,
      }),
    });

    const { sales, count } = await fetchSales(q, page);
    setSales(sales);
    setCount(count);
    setSelectedSales(null);
    setMode(null);
  };

  return (
    <div className={styles.container}>
      {/* TOP BAR */}
      <div className={styles.top}>
        <SearchInput initialQuery={q} />
        <button
          className={styles.addButton}
          onClick={() => router.push("/admin/dashboard/products/add")}
        >
          Add Sales
        </button>
      </div>

      {/* TABLE */}
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Phone</td>
            <td>Email</td>
            <td>Role</td>
            <td>Total Leads</td>
            <td>Active Leads</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {sales.map((s: any) => (
            <tr key={s._id}>
              <td>
                <div className={styles.user}>
                  <Image src="/noavatar.png" alt="Sales" width={40} height={40} />
                  {s.name}
                </div>
              </td>
              <td>{s.phone}</td>
              <td>{s.email || "—"}</td>
              <td>{s.role}</td>
              <td>{s.totalLeads}</td>
              <td>{s.activeLeads}</td>
              <td>
                <div className={styles.buttons}>
                  <button onClick={() => handleViewEdit(s._id, "view")}>
                    View
                  </button>
                  <button onClick={() => handleViewEdit(s._id, "edit")}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(s._id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {sales.length === 0 && (
            <tr>
              <td colSpan={7} className={styles.empty}>
                No sales person found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination count={count} />

      {/* MODAL */}
      {selectedSales && (
        <div className={styles.modal}>
          <h3>{mode === "view" ? "Sales Details" : "Edit Sales"}</h3>

          <input
            disabled={mode === "view"}
            value={selectedSales.name}
            onChange={(e) =>
              setSelectedSales({ ...selectedSales, name: e.target.value })
            }
          />

          <input
            disabled={mode === "view"}
            value={selectedSales.phone}
            onChange={(e) =>
              setSelectedSales({ ...selectedSales, phone: e.target.value })
            }
          />

          <input
            disabled={mode === "view"}
            value={selectedSales.email || ""}
            onChange={(e) =>
              setSelectedSales({ ...selectedSales, email: e.target.value })
            }
          />

          <select
            disabled={mode === "view"}
            value={selectedSales.role}
            onChange={(e) =>
              setSelectedSales({ ...selectedSales, role: e.target.value })
            }
          >
            <option value="sales">Sales</option>
            <option value="admin">Admin</option>
          </select>

          {mode === "edit" && (
            <button onClick={handleUpdate}>Update</button>
          )}

          <button
            onClick={() => {
              setSelectedSales(null);
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
