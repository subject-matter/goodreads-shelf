import { fetchGoodreadsBooks } from "../lib/goodreads";
import Shelf from "./shelf";

export default async function UserShelf({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  let books;
  try {
    books = await fetchGoodreadsBooks(userId);
  } catch {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-[500px]">
          <div className="mb-6">
            <a
              href="/"
              className="inline-flex items-center h-[26px] px-3 bg-[#f2f1ee] rounded-full text-[13px] text-[#8c877d] transition-colors duration-300 hover:text-black"
            >
              &lsaquo; Back
            </a>
          </div>
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
          <div className="mb-6">
            <a
              href="/"
              className="inline-flex items-center h-[26px] px-3 bg-[#f2f1ee] rounded-full text-[13px] text-[#8c877d] transition-colors duration-300 hover:text-black"
            >
              &lsaquo; Back
            </a>
          </div>
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

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white h-[50px] flex items-center px-3">
        <a
          href="/"
          className="inline-flex items-center h-[26px] px-3 bg-[#f2f1ee] rounded-full text-[13px] text-[#8c877d] transition-colors duration-300 hover:text-black"
        >
          &lsaquo; Back
        </a>
      </div>

      <div className="pt-[50px]">
        <Shelf books={books} />
      </div>

      <div className="px-6 pb-8 flex justify-center">
        <p className="text-[12px] text-[#8c877d]">Powered by Goodreads RSS</p>
      </div>
    </main>
  );
}
