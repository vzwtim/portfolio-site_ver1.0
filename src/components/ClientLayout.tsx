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
          <aside aria-label="最新版サイトのご案内" className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <a href="https://portfolio-site-ver2.vercel.app/" className="pointer-events-auto flex min-h-11 max-w-full items-center gap-3 rounded-full border border-black/10 bg-white/95 px-5 py-3 text-sm text-[#173b33] shadow-lg backdrop-blur-md transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#008877]">
              <span className="text-xs text-[#58665f]">旧版サイト</span>
              <span className="font-bold">最新版はこちら <span aria-hidden="true">↗</span></span>
            </a>
          </aside>
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