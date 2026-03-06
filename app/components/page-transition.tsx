"use client";

import { useContext, useEffect, useRef, useState, useLayoutEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;
  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const pendingUrl = useRef<string | null>(null);
  const prevPathname = useRef(pathname);

  useLayoutEffect(() => {
    if (prevPathname.current !== pathname) {
      setIsExiting(false);
      prevPathname.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (isExiting) return;
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor?.href || anchor.target || e.ctrlKey || e.metaKey || e.shiftKey) return;
      try {
        const url = new URL(anchor.href, window.location.origin);
        if (url.origin === window.location.origin && url.pathname !== pathname) {
          e.preventDefault();
          e.stopPropagation();
          pendingUrl.current = url.pathname + url.search + url.hash;
          setIsExiting(true);
        }
      } catch {
        // ignore malformed URLs
      }
    };
    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [pathname, isExiting]);

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        window.scrollTo(0, 0);
      }}
    >
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isExiting ? 0 : 1,
          transition: { duration: 0.4, delay: isExiting ? 0 : 0.25 },
        }}
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
        onAnimationComplete={() => {
          if (isExiting && pendingUrl.current) {
            router.push(pendingUrl.current);
            pendingUrl.current = null;
          }
        }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
