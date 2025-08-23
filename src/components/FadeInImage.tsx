"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

export default function FadeInImage({ className, src, alt, ...rest }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <Image
      {...rest}
      src={src}
      alt={alt}
      className={`${className ?? ""} transition-opacity duration-700 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
      onLoadingComplete={() => setLoaded(true)}
    />
  );
}
