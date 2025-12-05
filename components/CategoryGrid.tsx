import { KATEGORI } from "../lib/api";

const colors = [
  "bg-blue-600",
  "bg-emerald-600",
  "bg-fuchsia-600",
  "bg-indigo-600",
  "bg-rose-600",
  "bg-teal-600",
  "bg-amber-600",
  "bg-cyan-600",
];

export default function CategoryGrid() {
  return (
    <section id="kategori" className="mx-auto max-w-7xl px-6 py-10">
      <h2 className="text-xl font-semibold mb-4">Kategori Dokumen</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {KATEGORI.map((k, i) => (
          <a
            key={k.slug}
            href={`/kategori/${k.slug}`}
            className="group rounded-xl border p-5 hover:shadow-sm transition-shadow"
          >
            <div className={`h-10 w-10 rounded ${colors[i % colors.length]} mb-3`} />
            <div className="font-medium group-hover:underline">{k.name}</div>
            <div className="text-xs text-zinc-500">Telusuri dokumen {k.name.toLowerCase()}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
