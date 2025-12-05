import Image from "next/image";
import Link from "next/link";
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
  return (
    <article className="rounded-xl border p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-4">
        {(() => {
          const icon = iconFor(item.url);
          return <Image src={icon.src} alt={icon.alt} width={40} height={48} />;
        })()}
        <div className="flex-1">
          <div className="text-xs text-zinc-500 mb-1">{item.kategori}</div>
          <h3 className="text-base font-semibold">
          <Link href={`/dokumen/${String(item.id)}`} className="hover:underline">
            {item.judul}
          </Link>
          </h3>
          <div className="mt-1 inline-flex items-center gap-2">
            {item.url && <span className="rounded bg-zinc-100 px-2 py-1 text-xs dark:bg-zinc-800">{extOf(item.url)}</span>}
            {item.tanggal && <span className="text-xs text-zinc-500">{item.tanggal}</span>}
          </div>
        </div>
      </div>
      {item.ringkasan && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">{item.ringkasan}</p>
      )}
      <div className="flex items-center justify-end gap-3">
        <Link href={`/dokumen/${String(item.id)}`} className="rounded border px-3 py-1 text-sm">Detail</Link>
        {item.url && (
          <a href={item.url} className="rounded bg-black px-3 py-1 text-sm text-white dark:bg-white dark:text-black" target="_blank" rel="noopener noreferrer">Unduh</a>
        )}
      </div>
    </article>
  );
}
