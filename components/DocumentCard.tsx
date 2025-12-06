"use client";

import Image from "next/image";
import { Dokumen } from "../lib/api";

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
  if (e === "XLX") return { src: "/icons/xlx.svg", alt: e };
  if (e === "PPT") return { src: "/icons/ppt.svg", alt: e };
  if (e === "PPTX") return { src: "/icons/ppt.svg", alt: e };
  return { src: "/file.svg", alt: e || "FILE" };
};

type Props = { item: Dokumen };

export default function DocumentCard({ item }: Props) {
  const icon = iconFor(item.url);

  return (
    <a
      href={item.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full border-2 border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 p-3 transition-all hover:border-stone-800 dark:hover:border-stone-200 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        {/* File Icon */}
        <div className="flex-shrink-0 p-2 bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700">
          <Image
            src={icon.src}
            alt={icon.alt}
            width={20}
            height={26}
            className="w-5 h-auto"
          />
        </div>

        {/* Title & Description */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-serif font-medium text-stone-900 dark:text-stone-100 mb-1 group-hover:underline line-clamp-2">
            {item.judul}
          </h3>
          {item.description && (
            <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-3">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </a>
  );
}
