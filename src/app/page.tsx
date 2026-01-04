'use client';

import FadeInImage from "@/components/FadeInImage";
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const InterestsSection = dynamic(() => import("../components/InterestsSection"), { ssr: false });

export default function Home() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const overlayRef = useRef(null);
  const heroTextRef = useRef(null);
  const aboutTextRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }

    const heroElement = heroRef.current;
    if (!heroElement) return;

    // Use a timeout to ensure all elements, especially from dynamic imports, are mounted
    const timer = setTimeout(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: "top top",
          endTrigger: "#space-and-creation-section", // Use the ID from InterestsSection
          end: "bottom top",
          scrub: true,
        }
      });

      // Animate background scale
      timeline.to(bgRef.current, {
        scale: 1.15,
        ease: 'power1.inOut'
      }, 0);

      // Animate overlay opacity
      timeline.fromTo(overlayRef.current, 
        { opacity: 0.2 }, 
        { opacity: 0.8, ease: 'power1.inOut' }, 
        0
      );

              // Phase 2: heroText leaves as aboutText enters
              timeline.to(heroTextRef.current, {
                yPercent: -50,
                opacity: 0,
                ease: "power2.in",
                duration: 0.1
              }, 0);
          
              timeline.fromTo(aboutTextRef.current, 
                { yPercent: 200, opacity: 0 },
                { yPercent: 0, opacity: 1, ease: "power2.out", duration: 0.1 },
                0.05
              );
          
              // Phase 4: aboutText leaves
              timeline.to(aboutTextRef.current, {
                yPercent: -600,
                opacity: 0.5,
                ease: "power2.in",
                duration: 0.1
              }, 0.2);    }, 100); // 100ms delay to wait for dynamic components

    // Cleanup
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. FIXED HERO SECTION (BACKGROUND) */}
      <section ref={heroRef} className="fixed top-0 left-0 w-full h-screen z-0">
        {/* Background Image */}
        <div ref={bgRef} className="absolute inset-0">
          <FadeInImage
            src="/images/mv_gomoku_1_mobile.jpg"
            alt="Gomoku Rice"
            fill
            className="block md:hidden object-cover"
            loading="eager"
            sizes="100vw"
          />
          <FadeInImage
            src="/images/mv_gomoku_1.jpg"
            alt="Gomoku Rice"
            fill
            className="hidden md:block object-cover"
            loading="eager"
            sizes="100vw"
          />
        </div>
        
        {/* Overlay for darkening effect */}
        <div ref={overlayRef} className="absolute inset-0 bg-black opacity-0"></div>

        {/* Text Content Container (also fixed) */}
        <div className="relative h-full flex items-center justify-center text-center px-4 md:px-20">
          <div className="max-w-4xl mx-auto">
            
            {/* Hero Text */}
            <div ref={heroTextRef} className="absolute inset-0 flex justify-center items-center">
              <h1
                className="text-white text-3xl sm:text-5xl md:text-6xl font-light tracking-normal md:tracking-wider"
                style={{ fontFamily: '"Shippori Mincho", serif' }}
              >
                ぼくは、五目飯。
              </h1>
            </div>
            
            {/* About Text - Initially hidden */}
            <div ref={aboutTextRef} className="opacity-0">
              <div className="w-24 h-px bg-white/50 mx-auto mb-8"></div>
              <p className="text-white text-base md:text-lg leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: '"Shippori Mincho", serif' }}>
                ひとつに絞れない。<br />
                空間も、仕組みも、体験も。<br />
                いろんなことに手を出しちゃう。<br />
                気づくとアレンジも加えてる。<br />
                でも最後は、ちゃんとおいしくなる。<br />
                それが僕のつくり方。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SCROLLABLE MAIN CONTENT (FOREGROUND) */}
      <div className="relative z-10">
        {/* Spacer div to create scroll area for the hero animation */}
        <div ref={scrollContainerRef} className="h-[300vh]"></div>

        {/* Real content starts here, with a background color to obscure the fixed hero */}
        <div className="bg-white">
          <InterestsSection />
        </div>
      </div>
      
    </div>
  );
}