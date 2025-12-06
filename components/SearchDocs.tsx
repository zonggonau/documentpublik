"use client";

import { useMemo, useState } from "react";
import { Dokumen } from "../lib/api";
import DocumentCard from "./DocumentCard";
import { Search, X } from "lucide-react";

export default function SearchDocs({ items }: { items: Dokumen[] }) {
  const [q, setQ] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    let filtered = items;

    if (s) {
      filtered = filtered.filter((i) => i.judul.toLowerCase().includes(s));
    }

    if (selectedCategory) {
      filtered = filtered.filter((i) =>
        i.kategori.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    return filtered;
  }, [items, q, selectedCategory]);

  const categories = useMemo(() => {
    const cats = new Set(items.map(i => i.kategori));
    return Array.from(cats).sort();
  }, [items]);

  const hasFilters = q || selectedCategory;

  return (
    <section id="kategori" className="py-12 bg-stone-50 dark:bg-stone-950">
      <div className="mx-auto max-w-6xl px-6">
        {/* Search Box */}
        <div className="mb-8">
          <label className="block text-sm font-serif font-semibold text-stone-700 dark:text-stone-300 mb-3">
            Cari Dokumen
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="h-5 w-5 text-stone-400" />
            </div>
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ketik judul dokumen..."
              className="w-full border-2 border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 pl-12 pr-12 py-3 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-stone-800 dark:focus:border-stone-200 transition-colors font-serif"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <label className="block text-sm font-serif font-semibold text-stone-700 dark:text-stone-300 mb-3">
            Filter Kategori
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-4 py-2 text-sm font-serif font-medium transition-colors border-2 ${!selectedCategory
                ? "bg-stone-800 dark:bg-stone-200 text-stone-50 dark:text-stone-900 border-stone-800 dark:border-stone-200"
                : "bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:border-stone-800 dark:hover:border-stone-200"
                }`}
            >
              Semua Kategori
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === selectedCategory ? "" : cat)}
                className={`px-4 py-2 text-sm font-serif font-medium transition-colors border-2 ${selectedCategory === cat
                  ? "bg-stone-800 dark:bg-stone-200 text-stone-50 dark:text-stone-900 border-stone-800 dark:border-stone-200"
                  : "bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700 hover:border-stone-800 dark:hover:border-stone-200"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 pb-4 border-b-2 border-stone-300 dark:border-stone-700 flex items-center justify-between">
          <p className="text-sm text-stone-600 dark:text-stone-400 font-serif">
            Menampilkan <span className="font-bold text-stone-900 dark:text-stone-100">{results.length}</span> dokumen
            {hasFilters && " (terfilter)"}
          </p>
          {hasFilters && (
            <button
              onClick={() => {
                setQ("");
                setSelectedCategory("");
              }}
              className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 font-serif underline"
            >
              Reset filter
            </button>
          )}
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {results.map((i) => (
            <DocumentCard key={String(i.id)} item={i} />
          ))}
          {results.length === 0 && (
            <div className="col-span-full text-center py-16 border-2 border-dashed border-stone-300 dark:border-stone-700">
              <Search className="h-12 w-12 text-stone-400 mx-auto mb-4" />
              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">
                Tidak ada hasil
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 font-serif">
                Coba gunakan kata kunci atau filter yang berbeda
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
