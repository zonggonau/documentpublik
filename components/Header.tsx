"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b-2 border-stone-800 dark:border-stone-200 bg-stone-100 dark:bg-stone-900">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4 lg:px-6" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3 group">
            <div className="bg-stone-800 dark:bg-stone-200 p-2">
              <BookOpen className="h-6 w-6 text-stone-50 dark:text-stone-900" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-serif font-bold text-stone-900 dark:text-stone-50">Arsip Dokumen</span>
              <span className="text-xs font-serif text-stone-600 dark:text-stone-400">Kab. Intan Jaya</span>
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center p-2.5 text-stone-700 dark:text-stone-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          <Link
            href="/#kategori"
            className="text-sm font-serif font-semibold text-stone-900 dark:text-stone-50 hover:underline transition-all"
          >
            Kategori
          </Link>
        </div>
      </nav>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-stone-300 dark:border-stone-700">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              href="/#kategori"
              className="block px-3 py-2 text-base font-serif font-semibold text-stone-900 dark:text-stone-50 hover:bg-stone-200 dark:hover:bg-stone-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kategori
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
