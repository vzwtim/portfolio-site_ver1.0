'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ScrollbarWidthContextType {
  scrollbarWidth: number;
}

const ScrollbarWidthContext = createContext<ScrollbarWidthContextType | undefined>(undefined);

export const ScrollbarWidthProvider = ({ children }: { children: ReactNode }) => {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useEffect(() => {
    const calculateScrollbarWidth = () => {
      // Calculate scrollbar width by comparing innerWidth and clientWidth
      const width = window.innerWidth - document.documentElement.clientWidth;
      setScrollbarWidth(width);
    };

    // Initial calculation
    calculateScrollbarWidth();

    // Recalculate on resize
    window.addEventListener('resize', calculateScrollbarWidth);

    return () => {
      window.removeEventListener('resize', calculateScrollbarWidth);
    };
  }, []);

  return (
    <ScrollbarWidthContext.Provider value={{ scrollbarWidth }}>
      {children}
    </ScrollbarWidthContext.Provider>
  );
};

export const useScrollbarWidth = () => {
  const context = useContext(ScrollbarWidthContext);
  if (context === undefined) {
    throw new Error('useScrollbarWidth must be used within a ScrollbarWidthProvider');
  }
  return context;
};
