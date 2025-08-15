'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  /*
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54x4ac5
      
      
      
      
      
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: '-200vw', // Adjust based on number of sections (e.g., 3 sections = -200vw)
        ease: 'none',
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '2000px top', // Adjust based on desired scroll length
          scrub: 0.6,
          pin: true,
        },
      }
    );

    return () => {
      pin.kill();
      lenis.destroy();
    };
  }, []);
  */

  return (
    <section className="horizontal-scroll-wrapper">
      <div ref={triggerRef} className="h-[300vh] relative"> {/* This div controls the vertical scroll length */}
        <div ref={sectionRef} className="h-screen w-[300vw] flex flex-row absolute top-0 left-0"> {/* This div holds the horizontally scrolling content */}
          {/* Chapter 1 */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center bg-[#bb5555] text-white text-5xl">
            <div className="p-8">
              <h2 className="text-7xl font-extrabold mb-4">Chapter 1: Spatial & Creation</h2>
              <p className="text-3xl">Exploring the intersection of architecture and urban design.</p>
              <video className="w-full h-auto mt-8" autoPlay loop muted playsInline>
                <source src="/videos/placeholder_video_1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Chapter 2 */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center bg-[#008877] text-white text-5xl">
            <div className="p-8">
              <h2 className="text-7xl font-extrabold mb-4">Chapter 2: Culture & Exploration</h2>
              <p className="text-3xl">Delving into the depths of cultural heritage and new discoveries.</p>
              <video className="w-full h-auto mt-8" autoPlay loop muted playsInline>
                <source src="/videos/placeholder_video_2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Chapter 3 */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center bg-[#101820] text-white text-5xl">
            <div className="p-8">
              <h2 className="text-7xl font-extrabold mb-4">Chapter 3: Materials & Structure</h2>
              <p className="text-3xl">Understanding the essence of materials and structural integrity.</p>
              <video className="w-full h-auto mt-8" autoPlay loop muted playsInline>
                <source src="/videos/placeholder_video_3.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollSection;