"use client";

import { useState } from "react";
import { motion, type PanInfo, AnimatePresence } from "motion/react";
import type { CoverFlowItem } from "./coverflow";

interface MobileCarouselProps {
  items: CoverFlowItem[];
  initialIndex?: number;
  onItemClick?: (item: CoverFlowItem, index: number) => void;
}

export function MobileCarousel({
  items,
  initialIndex = 0,
  onItemClick,
}: MobileCarouselProps) {
  const [index, setIndex] = useState(Math.min(initialIndex, items.length - 1));
  const [direction, setDirection] = useState(0);

  const swipe = (dir: number) => {
    const next = index + dir;
    if (next < 0 || next >= items.length) return;
    setDirection(dir);
    setIndex(next);
  };

  const onDragEnd = (_e: unknown, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) swipe(1);
    else if (info.offset.x > threshold) swipe(-1);
  };

  const item = items[index];
  if (!item) return null;

  return (
    <div className="flex flex-col items-center w-full px-6">
      <div className="relative w-full max-w-[260px] aspect-[2/3] overflow-hidden rounded-xl shadow-2xl">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.img
            key={item.id}
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
            draggable={false}
            custom={direction}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={onDragEnd}
            onClick={() => onItemClick?.(item, index)}
          />
        </AnimatePresence>
      </div>

      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-black">{item.title}</h3>
        {item.subtitle && (
          <p className="text-[#8c877d] text-sm mt-1">{item.subtitle}</p>
        )}
      </div>

      <p className="text-[12px] text-[#8c877d] mt-3">
        {index + 1} / {items.length}
      </p>
    </div>
  );
}
