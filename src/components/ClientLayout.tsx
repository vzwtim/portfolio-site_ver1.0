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
  const isWorkDetailPage = pathname.startsWith('/works/') && pathname !== '/works';
  const prevPathRef = useRef(pathname);

  const prevPath = prevPathRef.current;
  const isPrevWorksList = prevPath === '/works';
  const isPrevWorkDetail = prevPath.startsWith('/works/') && prevPath !== '/works';
  const isCurrentWorksList = pathname === '/works';
  const isCurrentWorkDetail = pathname.startsWith('/works/') && pathname !== '/works';

  let slideDirection: 'forward' | 'back' | 'none' = 'none';
  if (isPrevWorksList && isCurrentWorkDetail) {
    slideDirection = 'forward';
  } else if (isPrevWorkDetail && isCurrentWorksList) {
    slideDirection = 'back';
  }

  prevPathRef.current = pathname;

  // 色の状態管理を ClientLayout に移動
  const [bgColor, setBgColor] = useState('bg-white');
  const [textColor, setTextColor] = useState('text-[#008877]');


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pathname]); // Add pathname to dependency array


  return (
    <div className={`transition-colors duration-500 ${bgColor}`}> {/* body から div に変更 */}
      <LoadingScreen isLoading={isLoading} />
      <ScrollbarWidthProvider> {/* Wrap with ScrollbarWidthProvider */}
        <CursorProvider>
          <CustomCursor />
          {/* Header に textColor を渡す */}
          <Header textColor={textColor} />
          <AnimatePresence mode="wait" initial={false}>
            <motion.main
              key={pathname}
              initial={
                slideDirection !== 'none'
                  ? { opacity: 0, x: slideDirection === 'forward' ? '100%' : '-100%' }
                  : { opacity: 0, y: 20 }
              }
              animate={
                slideDirection !== 'none'
                  ? { opacity: 1, x: 0 }
                  : { opacity: 1, y: 0 }
              }
              exit={
                slideDirection !== 'none'
                  ? { opacity: 0, x: slideDirection === 'forward' ? '-100%' : '100%' }
                  : { opacity: 0, y: -20 }
              }
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={textColor} // textColor を main にも適用
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
      </ScrollbarWidthProvider> {/* Close ScrollbarWidthProvider */}
    </div>
  );
}