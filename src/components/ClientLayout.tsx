'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from '@/components/LoadingScreen';
import { CursorProvider } from '@/context/CursorContext';
import { ScrollbarWidthProvider } from '@/context/ScrollbarWidthContext';
import ShadowAnimation from './ShadowAnimation';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const isHomePage = pathname === '/';

  // 色の状態管理を ClientLayout に移動
  const [bgColor, setBgColor] = useState('bg-white');
  const [textColor, setTextColor] = useState('text-[#008877]');

  // page.tsx から色の変更を受け取るためのコールバック関数
  const handleColorChange = (newBgColor: string, newTextColor: string) => {
    setBgColor(newBgColor);
    setTextColor(newTextColor);
  };

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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={textColor} // textColor を main にも適用
            >
              {children}
            </motion.main>
          </AnimatePresence>
          
          <ShadowAnimation>
            <Footer />
          </ShadowAnimation>
        </CursorProvider>
      </ScrollbarWidthProvider> {/* Close ScrollbarWidthProvider */}
    </div>
  );
}