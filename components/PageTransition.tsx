"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Hook to detect if user prefers reduced motion
function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setTransitionStage("fadeOut");

    // If reduced motion is preferred, skip the fade-out delay
    const delay = reducedMotion ? 0 : 150;

    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setTransitionStage("fadeIn");
    }, delay);

    return () => clearTimeout(timer);
  }, [pathname, children, reducedMotion]);

  return (
    <div
      style={{
        animation: reducedMotion
          ? "none"
          : transitionStage === "fadeIn"
          ? "pageFadeEnter 0.3s ease-out forwards"
          : "pageFadeExit 0.15s ease-in forwards",
        width: "100%"
      }}
    >
      {displayChildren}
    </div>
  );
}
