import Link from "next/link";
import { fetchDokumen, matchKategori } from "../../../lib/api";

type Params = { id: string };

export default async function Page({ params }: { params: Params }) {
  const items = await fetchDokumen().catch(() => [] as import("../../../lib/api").Dokumen[]);
  const item = Array.isArray(items) ? items.find((i) => String(i.id) === params.id) : undefined;
  if (!item) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-4">Dokumen tidak ditemukan.</div>
        <Link className="rounded border px-3 py-2" href="/">Kembali ke beranda</Link>
      </main>
    );
  }
  const slug = matchKategori(item);
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="text-sm text-zinc-500 mb-1">{item.kategori}</div>
      <h1 className="text-2xl font-bold mb-3">{item.judul}</h1>
      {item.tanggal && <div className="text-sm text-zinc-500 mb-6">Tanggal: {item.tanggal}</div>}
      {item.ringkasan && <p className="text-zinc-700 dark:text-zinc-300 mb-6">{item.ringkasan}</p>}
      <div className="flex gap-3">
        <Link className="rounded border px-3 py-2" href={`/kategori/${slug}`}>Lihat kategori</Link>
        {item.url && (
          <a className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black" href={item.url} target="_blank" rel="noopener noreferrer">Unduh dokumen</a>
        )}
      </div>
    </main>
  );
}
