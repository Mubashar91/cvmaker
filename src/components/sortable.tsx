"use client";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { GripVertical } from "lucide-react";

interface Drag { from: number; to: number }

/**
 * Drag-to-reorder for a vertical list, with mouse, pen, or touch. Put `ref` on the list and
 * `data-sort-item` on each item that is a direct child of it, and start a drag from a handle.
 * The move commits on release; Escape cancels. Keyboard and screen-reader users keep the
 * move up/down buttons, so the handle is a pointer shortcut and stays out of the tab order.
 */
export function useDragSort(onMove: (from: number, to: number) => void) {
  const ref = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<Drag | null>(null);
  const stop = useRef<(() => void) | null>(null);
  useEffect(() => () => stop.current?.(), []);

  function start(index: number, event: ReactPointerEvent<HTMLElement>) {
    if (event.button !== 0 || !ref.current || stop.current) return;
    event.preventDefault();
    try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* capture is optional */ }
    let state: Drag = { from: index, to: index };
    let pointerY = event.clientY;
    let frame = 0;
    setDrag(state);
    document.body.classList.add("is-sorting");

    const items = () => Array.from(ref.current?.querySelectorAll<HTMLElement>(":scope > [data-sort-item]") ?? []);
    // The new index is the number of other items whose middle is above the pointer.
    const target = () => items().filter((item, i) => { const box = item.getBoundingClientRect(); return i !== index && pointerY > box.top + box.height / 2; }).length;
    const update = () => { const to = target(); if (to !== state.to) { state = { from: index, to }; setDrag(state); } };
    // Scroll while the pointer rests near the top (below the sticky header) or bottom edge.
    const scroll = () => {
      const top = 130, bottom = window.innerHeight - 70;
      const speed = pointerY < top ? -(top - pointerY) / 4 : pointerY > bottom ? (pointerY - bottom) / 4 : 0;
      if (speed) { window.scrollBy(0, speed); update(); }
      frame = requestAnimationFrame(scroll);
    };
    frame = requestAnimationFrame(scroll);

    const move = (e: PointerEvent) => { pointerY = e.clientY; update(); };
    const finish = (commit: boolean) => { const { from, to } = state; stop.current?.(); if (commit && from !== to) onMove(from, to); };
    const release = () => finish(true);
    const cancel = () => finish(false);
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") { e.preventDefault(); finish(false); } };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", cancel);
    window.addEventListener("keydown", key);
    stop.current = () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", cancel);
      window.removeEventListener("keydown", key);
      document.body.classList.remove("is-sorting");
      stop.current = null;
      setDrag(null);
    };
  }

  /** Classes for an item: the one being dragged, and where it would land. */
  function itemClass(index: number) {
    if (!drag) return "";
    if (index === drag.from) return " is-dragging";
    if (drag.to < drag.from && index === drag.to) return " drop-before";
    if (drag.to > drag.from && index === drag.to) return " drop-after";
    return "";
  }

  return { ref, start, itemClass, dragging: drag !== null };
}

export function DragHandle({ onPointerDown }: { onPointerDown: (event: ReactPointerEvent<HTMLElement>) => void }) {
  return <span className="drag-handle" aria-hidden="true" title="Drag to reorder" onPointerDown={onPointerDown}><GripVertical size={16} /></span>;
}
