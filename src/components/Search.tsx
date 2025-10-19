import { SearchIcon } from "lucide-react";
import { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter city name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            flex-1 p-3 rounded-md border 
            bg-white/80 dark:bg-slate-800
            border-slate-300 dark:border-slate-700 
            text-slate-900 dark:text-slate-100
            placeholder-slate-500 dark:placeholder-slate-400
            focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-500
            transition-all duration-300
          "
        />
        <button
          type="submit"
          className="px-5 py-3 flex items-center gap-2 rounded-md font-medium bg-slate-600 text-white hover:bg-sky-slate dark:bg-slate-500 dark:hover:bg-slate-400 transition-all duration-300"
        >
          <SearchIcon className="w-4 h-4" />
          
        </button>

      </div>
    </form>
  );
}
