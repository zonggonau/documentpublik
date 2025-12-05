"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download, Calendar, Tag, ExternalLink, FileText, Maximize2 } from "lucide-react";
import { useEffect, useState } from "react";

type Params = { id: string };
type Dokumen = {
  id: string | number;
  judul: string;
  kategori: string;
  tanggal?: string;
  url?: string;
  ringkasan?: string;
  sumber?: string;
};

const extOf = (url?: string): string => {
  if (!url) return "FILE";
  try {
    const u = new URL(url);
    const path = u.pathname.toLowerCase();
    const m = path.match(/\.([a-z0-9]+)$/);
    const e = m?.[1] ?? "";
    if (["pdf"].includes(e)) return "PDF";
    if (["doc", "docx"].includes(e)) return e.toUpperCase();
    if (["xls", "xlsx"].includes(e)) return e.toUpperCase();
    if (["ppt", "pptx"].includes(e)) return e.toUpperCase();
    return e ? e.toUpperCase() : "FILE";
  } catch {
    const m = url.toLowerCase().match(/\.([a-z0-9]+)$/);
    return m?.[1]?.toUpperCase() ?? "FILE";
  }
};

const iconFor = (url?: string): { src: string; alt: string } => {
  const e = extOf(url);
  if (e === "PDF") return { src: "/icons/pdf.svg", alt: "PDF" };
  if (e === "DOC") return { src: "/icons/doc.svg", alt: e };
  if (e === "DOCX") return { src: "/icons/docx.svg", alt: e };
  if (e === "XLS") return { src: "/icons/xls.svg", alt: e };
  if (e === "XLSX") return { src: "/icons/xls.svg", alt: e };
  if (e === "PPT") return { src: "/icons/ppt.svg", alt: e };
  if (e === "PPTX") return { src: "/icons/ppt.svg", alt: e };
  return { src: "/file.svg", alt: e || "FILE" };
};

export default function Page({ params }: { params: Params }) {
  const [item, setItem] = useState<Dokumen | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/dokumen');
        const items = await res.json();
        const found = items.find((i: Dokumen) => String(i.id) === params.id);
        setItem(found || null);
      } catch (error) {
        console.error('Error loading document:', error);
        setItem(null);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
          <p className="text-zinc-600 dark:text-zinc-400">Memuat dokumen...</p>
        </div>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-6">
            <FileText className="h-10 w-10 text-zinc-400" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
            Dokumen tidak ditemukan
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Dokumen yang Anda cari tidak tersedia atau telah dihapus.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
            Kembali ke Beranda
          </Link>
        </div>
      </main>
    );
  }

  const icon = iconFor(item.url);
  const ext = extOf(item.url);
  const isPDF = ext === "PDF";

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Link>

            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30"
              >
                <Download className="h-4 w-4" />
                Unduh
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - PDF Viewer */}
          <div className="lg:col-span-2 space-y-6">
            {/* Document Info Card */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 shadow-sm">
                  <Image src={icon.src} alt={icon.alt} width={32} height={40} className="w-8 h-auto" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 mb-3">
                    <Tag className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                      {item.kategori}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-3">
                    {item.judul}
                  </h1>

                  {item.tanggal && (
                    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 mb-4">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Dipublikasikan: {item.tanggal}</span>
                    </div>
                  )}

                  {item.ringkasan && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {item.ringkasan}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* PDF Viewer */}
            {isPDF && item.url && (
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
                <div className="bg-zinc-100 dark:bg-zinc-800 px-6 py-3 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">Preview Dokumen</h2>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                    Buka Fullscreen
                  </a>
                </div>
                <div className="relative w-full" style={{ height: '800px' }}>
                  <iframe
                    src={`${item.url}#toolbar=1&navpanes=1&scrollbar=1`}
                    className="w-full h-full"
                    title={item.judul}
                  />
                </div>
              </div>
            )}

            {/* Non-PDF Message */}
            {!isPDF && (
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
                  <FileText className="h-8 w-8 text-zinc-400" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                  Preview tidak tersedia
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                  File {ext} tidak dapat ditampilkan di browser. Silakan unduh untuk melihat dokumen.
                </p>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
                  >
                    <Download className="h-5 w-5" />
                    Unduh Dokumen
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* File Info Card */}
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                  Informasi File
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-zinc-200 dark:border-zinc-800">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Format</span>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-white">{ext}</span>
                  </div>

                  {item.tanggal && (
                    <div className="flex items-center justify-between py-3 border-b border-zinc-200 dark:border-zinc-800">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">Tanggal</span>
                      <span className="text-sm font-semibold text-zinc-900 dark:text-white">{item.tanggal}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Kategori</span>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-white">{item.kategori}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-6 space-y-3">
                  {item.url && (
                    <a
                      href={item.url}
                      download
                      className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:from-blue-700 hover:to-blue-800 transition-all"
                    >
                      <Download className="h-5 w-5" />
                      Unduh Dokumen
                    </a>
                  )}

                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full rounded-xl border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 py-3 text-zinc-900 dark:text-white font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
                    >
                      <ExternalLink className="h-5 w-5" />
                      Buka di Tab Baru
                    </a>
                  )}
                </div>
              </div>

              {/* Share Card */}
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                  Bagikan Dokumen
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  Salin link untuk membagikan dokumen ini
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link berhasil disalin!');
                  }}
                  className="w-full rounded-xl border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
                >
                  Salin Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
