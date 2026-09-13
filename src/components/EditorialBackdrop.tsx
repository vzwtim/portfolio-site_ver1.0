"use client";

import { useEffect, useRef } from "react";
import styles from "@/app/refresh.module.css";

export default function EditorialBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!element || reduced) return;

    let frame = 0;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        element.style.setProperty("--page-progress", `${max > 0 ? window.scrollY / max : 0}`);
      });
    };
    const updatePointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      element.style.setProperty("--pointer-x", `${event.clientX}px`);
      element.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  return (
    <div ref={ref} className={styles.backdrop} aria-hidden="true">
      <div className={styles.asanohaField} />
      <div className={styles.pointerHalo} />
      <div className={styles.progressRail} />
    </div>
  );
}

