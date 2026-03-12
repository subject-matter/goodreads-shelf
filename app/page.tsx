export const dynamic = "force-dynamic";

import { getShelvesBuilt } from "./lib/redis";
import ShelfForm from "./components/shelf-form";

export default async function Home() {
  let count = 0;
  try {
    count = await getShelvesBuilt();
  } catch {
    // Redis not connected yet, show 0
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-[440px] w-full">
        <h1 className="text-[22px] font-medium text-black mb-2">
          My Bookshelf
        </h1>
        <p className="text-[15px] text-[#8c877d] leading-[1.7] mb-8">
          Paste your Goodreads profile URL to get a shareable link of your reading list.
        </p>

        <ShelfForm />

        <p className="text-[18px] font-medium text-black mt-6">
          {count} bookshelves built
        </p>
        <p className="text-[12px] text-[#8c877d] mt-2">
          Make sure your Goodreads shelves are set to public.
        </p>
      </div>
      <div className="fixed bottom-3 left-3 sm:left-auto sm:right-3 text-[11px] text-[#8c877d]">
        Built by{" "}
        <a
          href="https://x.com/rishisamuel"
          target="_blank"
          className="transition-colors duration-300 hover:text-black"
        >
          rishisamuel
        </a>
      </div>
    </main>
  );
}
