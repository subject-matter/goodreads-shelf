import Link from "next/link";
import { notFound } from "next/navigation";

const entries = [
  {
    slug: "on-slowing-down",
    title: "On Slowing Down",
    date: "5 March 2026",
    tag: "Essay",
    readTime: "4 min read",
    content: [
      { type: "p", text: "There's a particular kind of restlessness that comes from always optimising. Every hour accounted for, every task ranked by urgency. At some point I stopped and asked — what am I actually rushing toward?" },
      { type: "img", src: "https://placehold.co/500x300/f2f1ee/8c877d?text=Slowing+Down" },
      { type: "p", text: "I've been experimenting with doing less. Not productivity theatre, not a digital detox — just fewer things, done with more attention. Cooking without a recipe. Walking without a podcast. Writing without an outline." },
      { type: "p", text: "The hardest part isn't the doing less. It's resisting the urge to turn 'slowing down' into yet another project to optimise." },
    ],
  },
  {
    slug: "tools-i-use",
    title: "Tools I Use Daily",
    date: "18 February 2026",
    tag: "List",
    readTime: "3 min read",
    content: [
      { type: "p", text: "People ask me about my setup a lot, so here's a running list of what I actually use every day. No affiliate links, no sponsorships — just things I genuinely reach for." },
      { type: "img", src: "https://placehold.co/500x300/f2f1ee/8c877d?text=My+Desk" },
      { type: "p", text: "For writing, I keep it simple: iA Writer for drafts, Notion for longer projects. Code lives in VS Code with a minimal setup — Gruvbox theme, no extensions I don't use weekly." },
      { type: "p", text: "Hardware-wise: MacBook Pro 14\", a split keyboard I'm still getting used to, and Sony WH-1000XM5s that I wear even when nothing's playing." },
    ],
  },
  {
    slug: "notes-on-craft",
    title: "Notes on Craft",
    date: "9 January 2026",
    tag: "Essay",
    readTime: "5 min read",
    content: [
      { type: "p", text: "Craft is a word that gets thrown around a lot in tech. We talk about crafting experiences, crafting code, crafting brands. But what does it actually mean to care about the way something is made?" },
      { type: "p", text: "I think craft lives in the details no one asked for. The animation that feels just right. The error message that's actually helpful. The spacing that took an hour to get perfect." },
      { type: "img", src: "https://placehold.co/500x300/f2f1ee/8c877d?text=Craft" },
      { type: "p", text: "The best craftspeople I know share one trait: they can't help it. They'll stay late fixing something invisible because leaving it broken would bother them more than the effort of fixing it." },
    ],
  },
  {
    slug: "a-week-in-tokyo",
    title: "A Week in Tokyo",
    date: "12 December 2025",
    tag: "Travel",
    readTime: "6 min read",
    content: [
      { type: "p", text: "I went to Tokyo with no itinerary. Just a hotel in Shibuya, a Suica card, and a vague intention to eat well and walk far." },
      { type: "img", src: "https://placehold.co/500x300/f2f1ee/8c877d?text=Tokyo" },
      { type: "p", text: "Day one I walked 28,000 steps without trying. The city pulls you forward — around every corner there's something worth seeing. A tiny kissaten with three seats. A record shop in a basement. A shrine tucked between office buildings." },
      { type: "p", text: "The thing about Tokyo is that everything works. Trains are on time. Convenience stores are genuinely convenient. There's a care to public life that makes you reconsider what's normal." },
    ],
  },
  {
    slug: "why-personal-sites",
    title: "Why Personal Sites Matter",
    date: "3 November 2025",
    tag: "Essay",
    readTime: "4 min read",
    content: [
      { type: "p", text: "Social media profiles are rented land. You build on someone else's platform, play by their algorithm, and one day they change the rules or disappear entirely." },
      { type: "p", text: "A personal site is yours. It can be weird, sparse, overbuilt, or barely functional — and that's the point. It's a reflection of you, not a template optimised for engagement." },
      { type: "img", src: "https://placehold.co/500x300/f2f1ee/8c877d?text=Personal+Sites" },
      { type: "p", text: "I think everyone should have one, even if it's just a single page with your name and a way to reach you. It's a small act of independence in an increasingly centralised web." },
    ],
  },
];

export async function generateStaticParams() {
  return entries.map((entry) => ({ slug: entry.slug }));
}

export default async function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = entries.findIndex((e) => e.slug === slug);
  if (index === -1) notFound();

  const entry = entries[index];
  const prev = index < entries.length - 1 ? entries[index + 1] : null;
  const next = index > 0 ? entries[index - 1] : null;

  return (
    <main className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white h-[50px] flex items-center px-3">
        <a href="/writing" className="inline-flex items-center h-[26px] px-3 bg-[#f2f1ee] rounded-full text-[13px] text-[#8c877d] transition-colors duration-300 hover:text-black">&lsaquo; Writing</a>
      </div>
      <article className="pt-[74px] pb-16 px-6 max-w-[500px] mx-auto">
        <h1 className="text-[22px] font-medium text-black">{entry.title}</h1>
        <p className="text-[12px] text-[#8c877d] mt-2">{entry.tag} — {entry.date} — {entry.readTime}</p>

        <div className="mt-8 flex flex-col gap-6">
          {entry.content.map((block, i) =>
            block.type === "img" ? (
              <img
                key={i}
                src={block.src}
                alt=""
                className="w-full rounded-lg bg-[#f2f1ee]"
              />
            ) : (
              <p key={i} className="text-[16px] text-[#8c877d] leading-[1.7]">
                {block.text}
              </p>
            )
          )}
        </div>

        <div className="mt-12 flex justify-between items-center border-t border-[#f2f1ee] pt-6">
          {prev ? (
            <Link href={`/writing/${prev.slug}`} className="text-[13px] text-[#8c877d] transition-colors duration-300 hover:text-black">
              &lsaquo; Previous Entry
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/writing/${next.slug}`} className="text-[13px] text-[#8c877d] transition-colors duration-300 hover:text-black">
              Next Entry &rsaquo;
            </Link>
          ) : <span />}
        </div>
      </article>
    </main>
  );
}
