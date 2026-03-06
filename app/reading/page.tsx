"use client";

import { CoverFlow, type CoverFlowItem } from "../components/ui/coverflow";

const books: CoverFlowItem[] = [
  { id: 1, image: "https://placehold.co/400x600/e8e4de/8c877d?text=Meditations", title: "Meditations", subtitle: "Marcus Aurelius" },
  { id: 2, image: "https://placehold.co/400x600/ddd8cf/8c877d?text=Sapiens", title: "Sapiens", subtitle: "Yuval Noah Harari" },
  { id: 3, image: "https://placehold.co/400x600/d4cfc6/8c877d?text=Dune", title: "Dune", subtitle: "Frank Herbert" },
  { id: 4, image: "https://placehold.co/400x600/cbc5bb/8c877d?text=The+Stranger", title: "The Stranger", subtitle: "Albert Camus" },
  { id: 5, image: "https://placehold.co/400x600/c2bcb1/8c877d?text=Klara+and+the+Sun", title: "Klara and the Sun", subtitle: "Kazuo Ishiguro" },
  { id: 6, image: "https://placehold.co/400x600/b9b3a7/8c877d?text=Project+Hail+Mary", title: "Project Hail Mary", subtitle: "Andy Weir" },
  { id: 7, image: "https://placehold.co/400x600/b0a99d/8c877d?text=Stoner", title: "Stoner", subtitle: "John Williams" },
  { id: 8, image: "https://placehold.co/400x600/a7a093/8c877d?text=Thinking+Fast", title: "Thinking, Fast and Slow", subtitle: "Daniel Kahneman" },
  { id: 9, image: "https://placehold.co/400x600/9e9789/8c877d?text=Severance", title: "Severance", subtitle: "Ling Ma" },
  { id: 10, image: "https://placehold.co/400x600/958e7f/8c877d?text=Tomorrow", title: "Tomorrow, and Tomorrow, and Tomorrow", subtitle: "Gabrielle Zevin" },
];

export default function ReadingPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white h-[50px] flex items-center px-3">
        <a href="/" className="inline-flex items-center h-[26px] px-3 bg-[#f2f1ee] rounded-full text-[13px] text-[#8c877d] transition-colors duration-300 hover:text-black">&lsaquo; Home</a>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center pt-[50px]">
        <h1 className="text-[22px] font-medium text-black mb-4">Reading</h1>
        <p className="text-[13px] text-[#8c877d] mb-8">Books I&apos;ve read this year</p>
        <div className="w-full h-[500px]">
          <CoverFlow
            items={books}
            itemWidth={220}
            itemHeight={330}
            initialIndex={4}
            enableScroll={true}
            scrollThreshold={60}
            centerGap={180}
            stackSpacing={60}
            enableReflection={true}
          />
        </div>
      </div>
    </main>
  );
}
