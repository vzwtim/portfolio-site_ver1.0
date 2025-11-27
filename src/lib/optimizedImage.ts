export type OptimizedOptions = {
  type?: 'display' | 'thumbs';
  width?: number;
  format?: 'avif' | 'webp';
};

export function optimizedImage(
  src: string,
  { type = 'display', width = 1600, format = 'webp' }: OptimizedOptions = {}
): string {
  if (src.toLowerCase().endsWith('.svg')) {
    return src;
  }
  const base = src.replace(/^\/images\//, '').replace(/\.[^.]+$/, '');
  return `/optimized/${type}/${base}-${width}.${format}`;
}
