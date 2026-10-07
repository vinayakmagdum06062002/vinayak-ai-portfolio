"use client";

import { useCallback, useRef, type KeyboardEvent } from "react";

/**
 * WAI-ARIA tabs keyboard support: arrow keys move between tabs (with wrap),
 * Home/End jump to the ends, and focus follows selection.
 */
export function useTabKeyboard(count: number, onSelect: (index: number) => void, orientation: "horizontal" | "vertical" | "both" = "both") {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const setRef = useCallback(
    (index: number) => (el: HTMLButtonElement | null) => {
      refs.current[index] = el;
    },
    [],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const prevKeys = orientation === "horizontal" ? ["ArrowLeft"] : orientation === "vertical" ? ["ArrowUp"] : ["ArrowLeft", "ArrowUp"];
      const nextKeys = orientation === "horizontal" ? ["ArrowRight"] : orientation === "vertical" ? ["ArrowDown"] : ["ArrowRight", "ArrowDown"];
      let next: number | null = null;
      if (nextKeys.includes(event.key)) next = (index + 1) % count;
      else if (prevKeys.includes(event.key)) next = (index - 1 + count) % count;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = count - 1;
      if (next === null) return;
      event.preventDefault();
      onSelect(next);
      refs.current[next]?.focus();
    },
    [count, onSelect, orientation],
  );

  return { setRef, onKeyDown };
}
