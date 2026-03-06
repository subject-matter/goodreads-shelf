import Link from "next/link";

const entries = [
  { slug: "on-slowing-down", title: "On Slowing Down", date: "Mar 2026", tag: "Essay" },
  { slug: "tools-i-use", title: "Tools I Use Daily", date: "Feb 2026", tag: "List" },
  { slug: "notes-on-craft", title: "Notes on Craft", date: "Jan 2026", tag: "Essay" },
  { slug: "a-week-in-tokyo", title: "A Week in Tokyo", date: "Dec 2025", tag: "Travel" },
  { slug: "why-personal-sites", title: "Why Personal Sites Matter", date: "Nov 2025", tag: "Essay" },
];

export default function WritingPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white h-[50px] flex items-center px-3">
        <a href="/" className="inline-flex items-center h-[26px] px-3 bg-[#f2f1ee] rounded-full text-[13px] text-[#8c877d] transition-colors duration-300 hover:text-black">&lsaquo; Home</a>
      </div>
      <div className="pt-[74px] pb-16 px-6 max-w-[500px] mx-auto">
        <h1 className="text-[22px] font-medium text-black mb-8">Writing</h1>
        <div className="flex flex-col gap-6">
          {entries.map((entry) => (
            <Link
              key={entry.slug}
              href={`/writing/${entry.slug}`}
              className="group flex flex-col gap-1"
            >
              <p className="text-[16px] text-black group-hover:text-[#8c877d] transition-colors duration-300">{entry.title}</p>
              <p className="text-[12px] text-[#8c877d]">{entry.tag} — {entry.date}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
