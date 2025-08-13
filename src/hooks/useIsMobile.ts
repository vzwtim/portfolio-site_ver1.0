'use client';

import { useState, useEffect } from 'react';

// This hook returns undefined on the server and on the initial client render,
// then returns the boolean value once the component has mounted.
// This prevents hydration mismatch errors in Next.js.
const useIsMobile = (breakpoint = 768): boolean | undefined => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Set the value on the client
    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
