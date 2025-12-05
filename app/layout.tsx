import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dokumen Publik • Kabupaten Intan Jaya",
  description: "Portal resmi untuk akses dokumen publik Pemerintah Kabupaten Intan Jaya: Perencanaan, Keuangan, Produk Hukum, Kinerja Pemerintah, Pengadaan Barang & Jasa, Data & Statistik, SOP & Standar Layanan, dan PPID.",
  keywords: ["dokumen publik", "intan jaya", "papua", "pemerintah", "transparansi", "ppid"],
  authors: [{ name: "Pemerintah Kabupaten Intan Jaya" }],
  openGraph: {
    title: "Dokumen Publik • Kabupaten Intan Jaya",
    description: "Portal resmi untuk akses dokumen publik Pemerintah Kabupaten Intan Jaya",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>
        <Header />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
