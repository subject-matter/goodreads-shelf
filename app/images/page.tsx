"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const allPhotos = Array.from({ length: 36 }, (_, i) => ({
  src: `https://placehold.co/600x400/f2f1ee/8c877d?text=${i + 1}`,
  caption: [
    "Morning light", "Quiet street", "Golden hour", "Rooftop view",
    "Fog rolling in", "Late night walk", "Market day", "Sunset swim",
    "First snow", "Cobblestones", "Neon glow", "Harbour dawn",
    "Side alley", "Window seat", "Overcast park", "Bridge crossing",
    "Coffee shop", "Train platform", "Hilltop", "Fishing boats",
    "Old town", "Bookshop", "Canal reflections", "Midnight sun",
    "Desert road", "Terrace view", "Raindrops", "Street vendor",
    "Lighthouse", "Backyard", "Stairwell", "Ferris wheel",
    "Dusk", "Puddle mirror", "Vineyard", "Cloud break",
  ][i],
  location: [
    "London, UK", "Tokyo, JP", "Auckland, NZ", "New York, US",
    "San Francisco, US", "Berlin, DE", "Marrakech, MA", "Lisbon, PT",
    "Oslo, NO", "Prague, CZ", "Seoul, KR", "Sydney, AU",
  ][i % 12],
  date: `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i % 12]} 2025`,
}));

const PAGE_SIZE = 12;

export default function ImagesPage() {
  const [count, setCount] = useState(PAGE_SIZE);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const sentinel = useRef<HTMLDivElement>(null);

  const photos = allPhotos.slice(0, count);
  const hasMore = count < allPhotos.length;

  useEffect(() => {
    if (!sentinel.current || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCount((c) => Math.min(c + PAGE_SIZE, allPhotos.length));
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(sentinel.current);
    return () => observer.disconnect();
  }, [hasMore, count]);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const next = useCallback(() => setLightbox((i) => (i !== null && i < allPhotos.length - 1 ? i + 1 : i)), []);

  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, prev, next]);

  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white h-[50px] flex items-center px-3">
        <a href="/" className="inline-flex items-center h-[26px] px-3 bg-[#f2f1ee] rounded-full text-[13px] text-[#8c877d] transition-colors duration-300 hover:text-black">&lsaquo; Home</a>
      </div>
      <div className="h-[50px]" />
      <h1 className="text-[22px] font-medium text-black mb-8">Images</h1>
      <div className="grid grid-cols-4 gap-4">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 cursor-pointer"
            onClick={() => setLightbox(i)}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full aspect-[3/2] object-cover rounded-lg bg-[#f2f1ee] transition-opacity duration-300 hover:opacity-80"
            />
            <div className="flex flex-col gap-0.5">
              <p className="text-[13px] text-black">{photo.caption}</p>
              <p className="text-[11px] text-[#8c877d]">{photo.location} — {photo.date}</p>
            </div>
          </div>
        ))}
      </div>
      {hasMore && <div ref={sentinel} className="h-1" />}

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-3xl px-2 py-4 transition-colors"
          >
            &lsaquo;
          </button>
          <div
            className="max-w-4xl w-full mx-4 flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={allPhotos[lightbox].src}
              alt={allPhotos[lightbox].caption}
              className="w-full rounded-lg"
            />
            <div className="text-center">
              <p className="text-[14px] text-white">{allPhotos[lightbox].caption}</p>
              <p className="text-[12px] text-white/60">{allPhotos[lightbox].location} — {allPhotos[lightbox].date}</p>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-3xl px-2 py-4 transition-colors"
          >
            &rsaquo;
          </button>
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/60 hover:text-white text-xl transition-colors"
          >
            &times;
          </button>
        </div>
      )}
    </main>
  );
}
