"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

export default function FadeInImage({ className, src, alt, quality = 90, ...rest }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <Image
      {...rest}
      src={src}
      alt={alt}
      quality={quality}
      className={`${className ?? ""} transition-opacity duration-700 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
      onLoad={() => setLoaded(true)}
    />
  );
}
