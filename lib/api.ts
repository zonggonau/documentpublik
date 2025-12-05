export type Dokumen = {
  id: string | number;
  judul: string;
  kategori: string;
  tanggal?: string;
  url?: string;
  ringkasan?: string;
  sumber?: string;
  raw: unknown;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost/intanjayakab/wp-json/intanjaya/v1/dokumen";

type AnyRecord = Record<string, unknown>;

const pickFirst = (obj: AnyRecord, keys: string[]): unknown => {
  for (const k of keys) {
    if (obj == null) continue;
    const v = obj[k];
    if (v != null) return v;
  }
  return undefined;
};

const normalizeItem = (item: AnyRecord): Dokumen => {
  const idRaw = pickFirst(item, ["id", "ID", "post_id"]);
  const id: string | number = typeof idRaw === "number" ? idRaw : typeof idRaw === "string" ? idRaw : crypto.randomUUID();
  const title = pickFirst(item, ["title", "judul", "post_title", "name"]) ?? "Tanpa Judul";
  const categories = (item["categories"] as unknown) as AnyRecord[] | undefined;
  const firstCat = Array.isArray(categories) ? categories[0] : undefined;
  const catSlugOrName = pickFirst(firstCat ?? {}, ["slug", "name"]) ?? pickFirst(item, ["kategori", "category", "term", "taxonomy"]) ?? "Lainnya";
  const category = catSlugOrName;
  const date = pickFirst(item, ["tanggal", "date", "created_at", "post_date"]);
  const url = pickFirst(item, ["file_url", "url", "file", "link", "guid", "download_url"]);
  const excerpt = pickFirst(item, ["ringkasan", "excerpt", "summary", "content"]);
  const source = pickFirst(item, ["permalink", "sumber", "source"]);
  return {
    id,
    judul: typeof title === "string" ? title : String(title),
    kategori: Array.isArray(category) ? String(category[0]) : String(category),
    tanggal: typeof date === "string" ? date : date ? String(date) : undefined,
    url: typeof url === "string" ? url : url ? String(url) : undefined,
    ringkasan: typeof excerpt === "string" ? excerpt : excerpt ? String(excerpt) : undefined,
    sumber: typeof source === "string" ? source : source ? String(source) : undefined,
    raw: item,
  };
};

export const fetchDokumen = async (opts?: { page?: number; perPage?: number; category?: string }): Promise<Dokumen[]> => {
  try {
    const url = new URL(API_URL);
    if (opts?.page) url.searchParams.set("page", String(opts.page));
    if (opts?.perPage) url.searchParams.set("per_page", String(opts.perPage));
    if (opts?.category) url.searchParams.set("category", String(opts.category));
    const res = await fetch(url.toString(), { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data: unknown = await res.json();
    const arr = Array.isArray(data) ? data : (data as AnyRecord)?.items ?? [];
    return (arr as AnyRecord[]).map(normalizeItem);
  } catch {
    return [];
  }
};

export type DokumenPage = {
  items: Dokumen[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

export const fetchDokumenPage = async (opts?: { page?: number; perPage?: number; category?: string }): Promise<DokumenPage> => {
  try {
    const url = new URL(API_URL);
    if (opts?.page) url.searchParams.set("page", String(opts.page));
    if (opts?.perPage) url.searchParams.set("per_page", String(opts.perPage));
    if (opts?.category) url.searchParams.set("category", String(opts.category));
    const res = await fetch(url.toString(), { next: { revalidate: 60 } });
    if (!res.ok) {
      return { items: [], page: opts?.page ?? 1, per_page: opts?.perPage ?? 10, total: 0, total_pages: 1 };
    }
    const data = (await res.json()) as AnyRecord;
    const itemsRaw = (data?.items as AnyRecord[]) ?? [];
    return {
      items: itemsRaw.map(normalizeItem),
      page: Number(data?.page ?? opts?.page ?? 1),
      per_page: Number((data?.per_page ?? itemsRaw.length) || opts?.perPage || 10),
      total: Number(data?.total ?? itemsRaw.length),
      total_pages: Number(data?.total_pages ?? 1),
    };
  } catch {
    return { items: [], page: opts?.page ?? 1, per_page: opts?.perPage ?? 10, total: 0, total_pages: 1 };
  }
};

export const KATEGORI = [
  { name: "Perencanaan", slug: "perencanaan" },
  { name: "Keuangan", slug: "keuangan" },
  { name: "Produk Hukum", slug: "produk-hukum" },
  { name: "Kinerja Pemerintah", slug: "kinerja-pemerintah" },
  { name: "Pengadaan Barang & Jasa", slug: "pengadaan-barang-jasa" },
  { name: "Data & Statistik", slug: "data-statistik" },
  { name: "SOP & Standar Layanan", slug: "sop-standar-layanan" },
  { name: "Dokumen PPID", slug: "dokumen-ppid" },
];

export const matchKategori = (item: Dokumen): string => {
  const val = String(item.kategori).toLowerCase();
  for (const k of KATEGORI) {
    if (val.includes(k.slug) || val.includes(k.name.toLowerCase())) return k.slug;
  }
  return "lainnya";
};

export const filterByKategori = (items: Dokumen[], slug: string): Dokumen[] => {
  return items.filter((i) => matchKategori(i) === slug);
};

