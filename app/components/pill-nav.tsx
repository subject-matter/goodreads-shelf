"use client";

const links = [
  { label: "Twitter", href: "https://twitter.com/rishisamuel" },
  { label: "GitHub", href: "https://github.com/rishisamuel" },
  { label: "LinkedIn", href: "https://linkedin.com/in/rishisamuelpatel" },
];

const moreLinks = [
  { label: "Dribbble", href: "#" },
  { label: "Read.cv", href: "#" },
  { label: "Are.na", href: "#" },
  { label: "Instagram", href: "#" },
];

export default function PillNav() {
  return (
    <nav className="fixed left-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
      {links.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group h-[26px] w-[200px] bg-[#f2f1ee] rounded-full inline-flex items-center justify-between px-3 text-[13px] text-[#8c877d] transition-colors duration-300 hover:text-black"
        >
          {label}
          <span className="chevron-bounce opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            &rsaquo;
          </span>
        </a>
      ))}
      <div className="group/links relative">
        <button className="group h-[26px] w-[200px] bg-[#f2f1ee] rounded-full inline-flex items-center justify-between px-3 text-[13px] text-[#8c877d] transition-colors duration-300 hover:text-black">
          Links
          <span className="transition-transform duration-300 group-hover/links:rotate-90">
            &rsaquo;
          </span>
        </button>
        <div className="invisible opacity-0 group-hover/links:visible group-hover/links:opacity-100 transition-all duration-200 absolute left-[calc(100%+8px)] bottom-0 bg-white border border-[#f2f1ee] rounded-xl py-2 px-1 flex flex-col gap-1 min-w-[160px] shadow-sm">
          {moreLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-3 py-1 rounded-lg text-[13px] text-[#8c877d] transition-colors duration-300 hover:text-black hover:bg-[#f2f1ee] inline-flex items-center justify-between"
            >
              {label}
              <span className="chevron-bounce opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                &rsaquo;
              </span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
