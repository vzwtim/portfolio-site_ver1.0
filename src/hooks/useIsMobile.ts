'use client';

import { useState, useEffect } from 'react';

const useIsMobile = (breakpoint = 768) => {
  // Initialize state to false to avoid flash of mobile content on desktop
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // useEffect only runs on the client, so window is available.
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
