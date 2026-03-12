"use client";

import { CoverFlow, type CoverFlowItem } from "../components/ui/coverflow";
import type { Book } from "../lib/goodreads";

interface YearGroup {
  year: string;
  books: Book[];
  items: CoverFlowItem[];
}

export default function Shelf({ books }: { books: Book[] }) {
  // Group books by year, most recent first
  const grouped = new Map<string, Book[]>();
  for (const book of books) {
    const key = book.year ? String(book.year) : "Unknown";
    const group = grouped.get(key) || [];
    group.push(book);
    grouped.set(key, group);
  }

  const yearGroups: YearGroup[] = Array.from(grouped.entries())
    .sort(([a], [b]) => {
      if (a === "Unknown") return 1;
      if (b === "Unknown") return -1;
      return Number(b) - Number(a);
    })
    .map(([year, yearBooks]) => ({
      year,
      books: yearBooks,
      items: yearBooks.map((book, i) => ({
        id: `${year}-${i}`,
        image:
          book.imageUrl ||
          `https://placehold.co/400x600/e8e4de/8c877d?text=${encodeURIComponent(book.title)}`,
        title: book.title,
        subtitle: book.author,
      })),
    }));

  return (
    <div className="flex flex-col">
      {yearGroups.map((group) => (
        <div key={group.year} className="flex flex-col items-center justify-center py-8">
          <h2 className="text-[22px] font-medium text-black mb-2">{group.year}</h2>
          <p className="text-[13px] text-[#8c877d] mb-6">
            {group.books.length} book{group.books.length !== 1 ? "s" : ""} read
          </p>
          <div className="w-full h-[500px]">
            <CoverFlow
              items={group.items}
              itemWidth={220}
              itemHeight={330}
              initialIndex={Math.min(4, Math.max(0, group.items.length - 1))}
              enableScroll={true}
              scrollThreshold={60}
              centerGap={180}
              stackSpacing={60}
              enableReflection={true}
              onItemClick={(_item, index) => {
                const book = group.books[index];
                if (book?.link) window.open(book.link, "_blank");
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
