import SearchDocs from "../components/SearchDocs";
import { fetchDokumen } from "../lib/api";
import { BookOpen, Search } from "lucide-react";

export default async function Home() {
  const items = await fetchDokumen();

  // Sort by date (newest first)
  const sortedItems = [...items].sort((a, b) => {
    if (!a.tanggal) return 1;
    if (!b.tanggal) return -1;
    return new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime();
  });

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Classic Header */}
      <section className="border-b-4 border-stone-800 dark:border-stone-200 bg-stone-100 dark:bg-stone-900">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-stone-800 dark:bg-stone-200 rounded-sm">
              <BookOpen className="h-10 w-10 text-stone-50 dark:text-stone-900" />
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 dark:text-stone-50 mb-4 tracking-tight">
              Arsip Dokumen Publik
            </h1>

            <p className="text-lg text-stone-600 dark:text-stone-400 mb-2 font-serif">
              Pemerintah Kabupaten Intan Jaya
            </p>

            <div className="w-24 h-1 bg-stone-800 dark:bg-stone-200 mx-auto mt-6 mb-8"></div>

            {/* Description */}
            <div className="max-w-3xl mx-auto">
              <p className="text-base text-stone-700 dark:text-stone-300 font-serif leading-relaxed mb-4">
                Portal arsip dokumen publik ini menyediakan akses terbuka dan transparan terhadap berbagai dokumen resmi
                pemerintah daerah. Setiap dokumen dapat diakses dan diunduh secara gratis oleh masyarakat sebagai wujud
                keterbukaan informasi publik.
              </p>

              <p className="text-sm text-stone-600 dark:text-stone-400 font-serif leading-relaxed">
                Kategori dokumen meliputi: <span className="font-semibold">Perencanaan</span>, <span className="font-semibold">Keuangan</span>,
                <span className="font-semibold"> Produk Hukum</span>, <span className="font-semibold">Kinerja Pemerintah</span>,
                <span className="font-semibold"> Pengadaan Barang & Jasa</span>, <span className="font-semibold">Data & Statistik</span>,
                <span className="font-semibold"> SOP & Standar Layanan</span>, dan <span className="font-semibold">Dokumen PPID</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Documents */}
      <SearchDocs items={sortedItems} />

      {/* Classic Footer */}
      <footer className="border-t-4 border-stone-800 dark:border-stone-200 bg-stone-100 dark:bg-stone-900 py-12">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-stone-600 dark:text-stone-400 font-serif mb-4">
            Untuk informasi lebih lanjut atau permintaan dokumen
          </p>
          <a
            href="mailto:info@intanjayakab.go.id"
            className="inline-block border-2 border-stone-800 dark:border-stone-200 bg-stone-800 dark:bg-stone-200 text-stone-50 dark:text-stone-900 px-8 py-3 font-serif font-semibold hover:bg-stone-700 dark:hover:bg-stone-300 transition-colors"
          >
            Hubungi Kami
          </a>

          <div className="mt-8 pt-8 border-t border-stone-300 dark:border-stone-700">
            <p className="text-sm text-stone-500 dark:text-stone-500 font-serif">
              © {new Date().getFullYear()} Pemerintah Kabupaten Intan Jaya
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
