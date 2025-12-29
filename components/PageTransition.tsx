"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    setTransitionStage("fadeOut");

    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setTransitionStage("fadeIn");
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname, children]);

  return (
    <div
      className={`page-transition-wrapper ${transitionStage}`}
      style={{
        animation: transitionStage === "fadeIn"
          ? "pageEnter 0.3s ease-out forwards"
          : "pageExit 0.15s ease-in forwards"
      }}
    >
      {displayChildren}
    </div>
  );
}
