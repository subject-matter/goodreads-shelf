import type { Metadata } from "next";
import { fetchGoodreadsBooks } from "../lib/goodreads";
import { incrementShelvesBuilt } from "../lib/redis";
import Shelf from "./shelf";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>;
}): Promise<Metadata> {
  const { userId } = await params;
  try {
    const { userName } = await fetchGoodreadsBooks(userId);
    return { title: userName ? `${userName}'s bookshelf` : "My Bookshelf" };
  } catch {
    return { title: "My Bookshelf" };
  }
}

export default async function UserShelf({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  let books;
  let userName = "";
  try {
    const result = await fetchGoodreadsBooks(userId);
    books = result.books;
    userName = result.userName;
  } catch {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-[500px]">
          <h1 className="text-[22px] font-medium text-black mb-4">
            Couldn&apos;t load books
          </h1>
          <p className="text-[15px] text-[#8c877d] leading-[1.7]">
            There was a problem fetching this shelf. Check that the user ID is
            correct and the shelf is set to public.
          </p>
        </div>
      </main>
    );
  }

  if (books.length === 0) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-[500px]">
          <h1 className="text-[22px] font-medium text-black mb-4">
            No books found
          </h1>
          <p className="text-[15px] text-[#8c877d] leading-[1.7]">
            This shelf is empty. Make sure the shelf is set to public on
            Goodreads.
          </p>
        </div>
      </main>
    );
  }

  // Fire-and-forget — don't let Redis failure break the page
  incrementShelvesBuilt().catch(() => {});

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <div>
        <Shelf books={books} userName={userName} />
      </div>
    </main>
  );
}
