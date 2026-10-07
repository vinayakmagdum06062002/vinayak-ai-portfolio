"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

interface RevealProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
  id?: string;
}

/**
 * Fades content in when it enters the viewport.
 * Content is only hidden when the `js` class is present on <html>, so it is
 * always visible without JavaScript, and reduced-motion users see it instantly.
 */
export function Reveal({ as: Tag = "div", children, className, delay = 0, style, id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      node.dataset.reveal = "in";
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.reveal = "in";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.04 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const mergedStyle = { ...style, "--reveal-delay": `${delay}ms` } as CSSProperties;

  return (
    <Tag ref={ref} id={id} data-reveal="" className={className} style={mergedStyle}>
      {children}
    </Tag>
  );
}
