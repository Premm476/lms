import { useState } from "react";
import { useRouter } from "next/router";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return; // Prevent empty search
    router.push(`/courses?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex items-center border rounded-lg overflow-hidden w-full max-w-md">
      <input
        type="text"
        placeholder="Search Courses..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Search on Enter key
        className="flex-1 p-3 outline-none text-gray-700"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-5 py-3 flex items-center gap-2 hover:bg-blue-600 transition-all"
      >
        Search <Search size={16} />
      </button>
    </div>
  );
};

export default SearchBar;
