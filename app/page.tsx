"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Extract user ID from various Goodreads URL formats
    // e.g. https://www.goodreads.com/user/show/12345-username
    // or just "12345"
    const match = url.match(/\/user\/show\/(\d+)/);
    const directId = url.match(/^(\d+)$/);

    const userId = match?.[1] || directId?.[1];

    if (!userId) {
      setError("Paste a Goodreads profile URL like goodreads.com/user/show/12345");
      return;
    }

    router.push(`/${userId}`);
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-[440px] w-full">
        <h1 className="text-[22px] font-medium text-black mb-2">
          Goodreads Shelf
        </h1>
        <p className="text-[15px] text-[#8c877d] leading-[1.7] mb-8">
          Paste your Goodreads profile URL to get a shareable link of your reading list.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="goodreads.com/user/show/12345"
            className="w-full h-[46px] px-4 bg-[#f2f1ee] rounded-lg text-[15px] text-black placeholder:text-[#8c877d] outline-none focus:ring-2 focus:ring-[#8c877d]/30 transition-shadow"
          />
          <button
            type="submit"
            className="h-[46px] bg-black text-white rounded-lg text-[15px] font-medium hover:bg-[#333] transition-colors duration-300 cursor-pointer"
          >
            Generate my link
          </button>
          {error && (
            <p className="text-[13px] text-red-500">{error}</p>
          )}
        </form>

        <p className="text-[12px] text-[#8c877d] mt-6">
          Make sure your Goodreads shelves are set to public.
        </p>
      </div>
    </main>
  );
}
