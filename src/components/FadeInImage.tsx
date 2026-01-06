"use client";

import Image, { ImageProps } from "next/image";

export default function FadeInImage({
  className,
  src,
  alt,
  quality = 90,
  ...rest
}: ImageProps) {
  return (
    <Image
      {...rest}
      src={src}
      alt={alt}
      quality={quality}
      className={`${className ?? ""}`}
    />
  );
}
