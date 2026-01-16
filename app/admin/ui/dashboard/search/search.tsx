// "use client";

// import { MdSearch } from "react-icons/md";
// import styles from "./search.module.css";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useDebouncedCallback } from "use-debounce";

// const Search = ({ placeholder }) => {
//   const searchParams = useSearchParams();
//   const { replace } = useRouter();
//   const pathname = usePathname();

//   const handleSearch = useDebouncedCallback((e) => {
//     const params = new URLSearchParams(searchParams);

//     params.set("page", 1);

//     if (e.target.value) {
//       e.target.value.length > 2 && params.set("q", e.target.value);
//     } else {
//       params.delete("q");
//     }
//     replace(`${pathname}?${params}`);
//   }, 300);

//   return (
//     <div className={styles.container}>
//       <MdSearch />
//       <input
//         type="text"
//         placeholder={placeholder}
//         className={styles.input}
//         onChange={handleSearch}
//       />
//     </div>
//   );
// };

// export default Search;
"use client";
import React, { useState } from "react"; 
import { MdSearch } from "react-icons/md";
import styles from "./search.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface SearchInputProps {
  placeholder?: string;
  initialQuery?: string;
}

const SearchInput = ({ placeholder = "Search...", initialQuery = "" }: SearchInputProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = React.useState(initialQuery);

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", "1");

    if (value && value.length > 2) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        value={query}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
