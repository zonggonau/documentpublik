import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur dark:bg-black/60">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded bg-black text-white dark:bg-white dark:text-black">IJ</span>
          <div className="leading-tight">
            <div className="text-sm font-semibold">Kabupaten Intan Jaya</div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400">Portal Dokumen Publik</div>
          </div>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/" className="hover:underline">Beranda</Link>
          <a href="#kategori" className="hover:underline">Kategori</a>
          <a href="#terbaru" className="hover:underline">Terbaru</a>
        </nav>
      </div>
    </header>
  );
}
