import { fetchGoodreadsBooks } from "../lib/goodreads";

function Stars({ rating }: { rating: number }) {
  if (!rating) return null;
  return (
    <span className="text-[12px] text-[#8c877d] tracking-wide">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
}

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

  return (
    <main className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white h-[50px] flex items-center px-3">
        <a
          href="/"
          className="inline-flex items-center h-[26px] px-3 bg-[#f2f1ee] rounded-full text-[13px] text-[#8c877d] transition-colors duration-300 hover:text-black"
        >
          &lsaquo; Back
        </a>
      </div>

      <div className="pt-[74px] pb-16 px-6 max-w-[560px] mx-auto">
        <h1 className="text-[22px] font-medium text-black mb-2">
          Reading List
        </h1>
        <p className="text-[13px] text-[#8c877d] mb-10">
          {books.length} book{books.length !== 1 ? "s" : ""} on the shelf
        </p>

        {books.length === 0 ? (
          <p className="text-[15px] text-[#8c877d]">
            No books found on this shelf. Make sure the shelf is public on
            Goodreads.
          </p>
        ) : (
          <div className="flex flex-col gap-8">
            {books.map((book, i) => (
              <a
                key={i}
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-5 items-start"
              >
                {book.imageUrl ? (
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-[60px] h-[90px] object-cover rounded-sm shadow-sm flex-shrink-0 bg-[#f2f1ee]"
                  />
                ) : (
                  <div className="w-[60px] h-[90px] rounded-sm bg-[#f2f1ee] flex-shrink-0 flex items-center justify-center">
                    <span className="text-[10px] text-[#8c877d] text-center px-1">
                      {book.title}
                    </span>
                  </div>
                )}
                <div className="flex flex-col gap-1 pt-1">
                  <p className="text-[16px] text-black group-hover:text-[#8c877d] transition-colors duration-300 leading-snug">
                    {book.title}
                  </p>
                  <p className="text-[13px] text-[#8c877d]">{book.author}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <Stars rating={book.rating} />
                    {book.dateRead && (
                      <span className="text-[12px] text-[#8c877d]">
                        {book.dateRead}
                      </span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-[#f2f1ee]">
          <p className="text-[12px] text-[#8c877d]">
            Powered by Goodreads RSS
          </p>
        </div>
      </div>
    </main>
  );
}
