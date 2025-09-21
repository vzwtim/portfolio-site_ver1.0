'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dynamic from 'next/dynamic';
import { CursorProvider } from '@/context/CursorContext';
import { ScrollbarWidthProvider } from '@/context/ScrollbarWidthContext';

import { useTheme } from '@/context/ThemeContext';

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
// Render the loading screen on the server to avoid a flash of the underlying page
// before the doors animation appears on first load
import LoadingScreen from '@/components/LoadingScreen';
const ShadowAnimation = dynamic(() => import('./ShadowAnimation'), { ssr: false });

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const isWorkDetailPage = pathname.startsWith('/works/') && pathname !== '/works';
  const isAppsPage = pathname === '/apps';

  const { bgColor, textColor } = useTheme();

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
          {!isAppsPage && <Header textColor={textColor} />}
          <main className={textColor}>
            {children}
          </main>
          
          {!isWorkDetailPage && !isAppsPage && (
            <ShadowAnimation>
              <Footer />
            </ShadowAnimation>
          )}
        </CursorProvider>
      </ScrollbarWidthProvider> {/* Close ScrollbarWidthProvider */}
    </div>
  );
}