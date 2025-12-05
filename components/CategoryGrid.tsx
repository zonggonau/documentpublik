"use client";

import { KATEGORI } from "../lib/api";
import Link from "next/link";
import {
  FileText,
  DollarSign,
  Scale,
  TrendingUp,
  ShoppingCart,
  BarChart3,
  FileCheck,
  FolderOpen
} from "lucide-react";

const icons = [
  FileText,      // Perencanaan
  DollarSign,    // Keuangan
  Scale,         // Produk Hukum
  TrendingUp,    // Kinerja Pemerintah
  ShoppingCart,  // Pengadaan Barang & Jasa
  BarChart3,     // Data & Statistik
  FileCheck,     // SOP & Standar Layanan
  FolderOpen,    // Dokumen PPID
];

const gradients = [
  "from-blue-500 to-blue-700",
  "from-emerald-500 to-emerald-700",
  "from-purple-500 to-purple-700",
  "from-indigo-500 to-indigo-700",
  "from-rose-500 to-rose-700",
  "from-teal-500 to-teal-700",
  "from-amber-500 to-amber-700",
  "from-cyan-500 to-cyan-700",
];

export default function CategoryGrid() {
  return (
    <section id="kategori" className="relative py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Kategori Dokumen
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Akses cepat ke berbagai jenis dokumen publik pemerintah
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {KATEGORI.map((k, i) => {
            const Icon = icons[i % icons.length];
            const gradient = gradients[i % gradients.length];

            return (
              <Link
                key={k.slug}
                href={`/kategori/${k.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                <div className="relative">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {k.name}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Telusuri dokumen {k.name.toLowerCase()}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
