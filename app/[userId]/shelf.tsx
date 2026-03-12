"use client";

import { useState, useEffect } from "react";
import { CoverFlow, type CoverFlowItem } from "../components/ui/coverflow";
import { MobileCarousel } from "../components/ui/mobile-carousel";
import type { Book } from "../lib/goodreads";

interface YearGroup {
  year: string;
  books: Book[];
  items: CoverFlowItem[];
}

export default function Shelf({ books, userName }: { books: Book[]; userName: string }) {
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

  const [selectedYear, setSelectedYear] = useState<string>(
    yearGroups[0]?.year ?? ""
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const activeGroup = yearGroups.find((g) => g.year === selectedYear);

  return (
    <div className="flex flex-col items-center">
      {userName && (
        <h1 className="text-[22px] font-medium text-black pt-8 pb-2">
          {userName}&apos;s bookshelf
        </h1>
      )}
      <div className="flex flex-wrap justify-center gap-2 px-4 pt-4 pb-2">
        {yearGroups.map((group) => (
          <button
            key={group.year}
            onClick={() => setSelectedYear(group.year)}
            className={`inline-flex items-center h-[26px] px-3 rounded-full text-[13px] transition-colors duration-300 ${
              selectedYear === group.year
                ? "bg-black text-white"
                : "bg-[#f2f1ee] text-[#8c877d] hover:text-black"
            }`}
          >
            {group.year}
          </button>
        ))}
      </div>

      {activeGroup && (
        <div className="flex flex-col items-center justify-center py-8 w-full">
          <p className="text-[13px] text-[#8c877d] mb-6">
            {activeGroup.books.length} book
            {activeGroup.books.length !== 1 ? "s" : ""} read
          </p>
          {isMobile ? (
            <MobileCarousel
              key={activeGroup.year}
              items={activeGroup.items}
              initialIndex={Math.min(
                4,
                Math.max(0, activeGroup.items.length - 1)
              )}
              onItemClick={(_item, index) => {
                const book = activeGroup.books[index];
                if (book?.link) window.open(book.link, "_blank");
              }}
            />
          ) : (
            <div className="w-full h-[500px]">
              <CoverFlow
                key={activeGroup.year}
                items={activeGroup.items}
                itemWidth={220}
                itemHeight={330}
                initialIndex={Math.min(
                  4,
                  Math.max(0, activeGroup.items.length - 1)
                )}
                enableScroll={true}
                scrollThreshold={60}
                centerGap={180}
                stackSpacing={60}
                enableReflection={true}
                onItemClick={(_item, index) => {
                  const book = activeGroup.books[index];
                  if (book?.link) window.open(book.link, "_blank");
                }}
              />
            </div>
          )}
        </div>
      )}

    </div>
  );
}
