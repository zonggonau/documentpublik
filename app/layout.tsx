import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dokumen Publik • Kabupaten Intan Jaya",
  description: "Akses dokumen publik Kabupaten Intan Jaya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <footer className="mt-20 border-t">
          <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-zinc-600 dark:text-zinc-400">
            © Kabupaten Intan Jaya. Semua hak dilindungi.
          </div>
        </footer>
      </body>
    </html>
  );
}
