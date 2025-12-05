"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-4 text-red-600">Terjadi kesalahan: {error.message}</div>
      <button className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black" onClick={reset}>Coba lagi</button>
    </div>
  );
}

