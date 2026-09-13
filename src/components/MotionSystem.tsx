'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function MotionSystem() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo('[data-hero-line]', { yPercent: 115, rotate: 3 }, { yPercent: 0, rotate: 0, duration: 1.25, stagger: .12, ease: 'power4.out', delay: .15 });
      gsap.fromTo('[data-hero-meta]', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .8, stagger: .08, delay: .7 });
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(element, { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } });
      });
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
        gsap.to(element, { yPercent: Number(element.dataset.parallax || 12), ease: 'none', scrollTrigger: { trigger: element.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 } });
      });
      const hero = document.querySelector<HTMLElement>('.hero');
      const layers = gsap.utils.toArray<HTMLElement>('[data-cursor-layer]');
      const move = (event: PointerEvent) => {
        const x = event.clientX / window.innerWidth - .5;
        const y = event.clientY / window.innerHeight - .5;
        layers.forEach((layer, index) => gsap.to(layer, { x: x * (index + 1) * 32, y: y * (index + 1) * 22, duration: 1.2, ease: 'power3.out', overwrite: true }));
      };
      hero?.addEventListener('pointermove', move);
      return () => hero?.removeEventListener('pointermove', move);
    });
    return () => context.revert();
  }, [pathname]);

  return null;
}
