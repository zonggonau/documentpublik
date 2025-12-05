"use client";

import { useMemo, useState } from "react";
import { Dokumen } from "../lib/api";
import DocumentCard from "./DocumentCard";

export default function SearchDocs({ items }: { items: Dokumen[] }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [] as Dokumen[];
    return items.filter((i) => i.judul.toLowerCase().includes(s));
  }, [items, q]);
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <h2 className="text-xl font-semibold mb-4">Pencarian</h2>
      <div className="flex gap-2 mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari judul dokumen"
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>
      {q && <div className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">Menampilkan {results.length} hasil</div>}
      {q && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((i) => (
            <DocumentCard key={String(i.id)} item={i} />
          ))}
          {results.length === 0 && (
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Tidak ada hasil.</div>
          )}
        </div>
      )}
    </section>
  );
}
