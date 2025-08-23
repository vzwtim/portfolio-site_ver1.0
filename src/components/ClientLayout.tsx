'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dynamic from 'next/dynamic';
import { CursorProvider } from '@/context/CursorContext';
import { ScrollbarWidthProvider } from '@/context/ScrollbarWidthContext';

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false });
const ShadowAnimation = dynamic(() => import('./ShadowAnimation'), { ssr: false });

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const prevPathRef = useRef(pathname);
  const [direction, setDirection] = useState(0);
  const isWorkDetailPage = pathname.startsWith('/works/') && pathname !== '/works';

  useEffect(() => {
    const prev = prevPathRef.current;
    if (prev === '/works' && pathname.startsWith('/works/') && pathname !== '/works') {
      setDirection(1);
    } else if (prev.startsWith('/works/') && prev !== '/works' && pathname === '/works') {
      setDirection(-1);
    } else {
      setDirection(0);
    }
    prevPathRef.current = pathname;
  }, [pathname]);

  // 色の状態管理を ClientLayout に移動
  const [bgColor, setBgColor] = useState('bg-white');
  const [textColor, setTextColor] = useState('text-[#008877]');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pathname]); // Add pathname to dependency array

  const variants = {
    initial: (dir: number) =>
      dir === 0 ? { opacity: 0, y: 20 } : { opacity: 0, x: dir > 0 ? '100%' : '-100%' },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: (dir: number) =>
      dir === 0 ? { opacity: 0, y: -20 } : { opacity: 0, x: dir > 0 ? '-100%' : '100%' },
  };

  return (
    <div className={`transition-colors duration-500 ${bgColor}`}>
      <LoadingScreen isLoading={isLoading} />
      <ScrollbarWidthProvider>
        <CursorProvider>
          <CustomCursor />
          <Header textColor={textColor} />
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.main
              key={pathname}
              custom={direction}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={textColor}
            >
              {children}
            </motion.main>
          </AnimatePresence>
          {!isWorkDetailPage && (
            <ShadowAnimation>
              <Footer />
            </ShadowAnimation>
          )}
        </CursorProvider>
      </ScrollbarWidthProvider>
    </div>
  );
}
