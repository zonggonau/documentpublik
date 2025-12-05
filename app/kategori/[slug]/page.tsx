import Link from "next/link";
import DocumentCard from "../../../components/DocumentCard";
import { fetchDokumenPage, filterByKategori, KATEGORI } from "../../../lib/api";

type Params = { slug: string };

export default async function Page({ params, searchParams }: { params: Params; searchParams?: { page?: string | string[] } }) {
  const pageParam = searchParams?.page;
  const raw = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const parsed = Number(raw);
  const page = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  const pageData = await fetchDokumenPage({ page, perPage: 100 }).catch(() => ({ items: [], page, per_page: 100, total: 0, total_pages: 1 }));
  const filtered = filterByKategori(pageData.items, params.slug);
  const meta = KATEGORI.find((k) => k.slug === params.slug);
  const visible = filtered;
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-bold mb-2">{meta?.name ?? params.slug}</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">Daftar dokumen kategori {meta?.name ?? params.slug}.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((i) => (
          <DocumentCard key={String(i.id)} item={i} />
        ))}
        {visible.length === 0 && (
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Belum ada dokumen.</div>
        )}
      </div>
      <div className="mt-8 flex items-center gap-3">
        <Link className="rounded border px-3 py-2 disabled:opacity-50" href={{ pathname: `/kategori/${params.slug}`, query: { page: Math.max(1, page - 1) } }}>Sebelumnya</Link>
        <span className="text-sm text-zinc-600">Halaman {page} dari {pageData.total_pages}</span>
        <Link className="rounded border px-3 py-2 disabled:opacity-50" href={{ pathname: `/kategori/${params.slug}`, query: { page: Math.min(pageData.total_pages, page + 1) } }}>Berikutnya</Link>
      </div>
    </main>
  );
}

export async function generateMetadata({ params }: { params: Params }) {
  const meta = KATEGORI.find((k) => k.slug === params.slug);
  const title = `Dokumen ${meta?.name ?? params.slug} • Kabupaten Intan Jaya`;
  const description = `Daftar dokumen publik untuk kategori ${meta?.name ?? params.slug}.`;
  return { title, description };
}
