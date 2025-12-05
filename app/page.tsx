import CategoryGrid from "../components/CategoryGrid";
import DocumentCard from "../components/DocumentCard";
import SearchDocs from "../components/SearchDocs";
import { fetchDokumen } from "../lib/api";

export default async function Home() {
  const items = await fetchDokumen();
  const latest = items.slice(0, 8);
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-900" />
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-12">
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Dokumen Publik Kabupaten Intan Jaya</h1>
            <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
              Portal modern untuk akses informasi resmi: Perencanaan, Keuangan, Produk Hukum, Kinerja Pemerintah, Pengadaan Barang & Jasa, Data & Statistik, SOP & Standar Layanan, dan PPID.
            </p>
            <div className="flex gap-3">
              <a href="#kategori" className="rounded bg-black px-5 py-2.5 text-white dark:bg-white dark:text-black">Telusuri Kategori</a>
              <a href="#terbaru" className="rounded border px-5 py-2.5">Lihat Terbaru</a>
            </div>
          </div>
        </div>
      </section>
      <CategoryGrid />
      <SearchDocs items={items} />
      <section id="terbaru" className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="text-xl font-semibold mb-4">Terbaru</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map((i) => (
            <DocumentCard key={String(i.id)} item={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
