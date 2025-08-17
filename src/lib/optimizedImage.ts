export type OptimizedOptions = {
  type?: 'display' | 'thumbs';
  width?: number;
  format?: 'avif' | 'webp';
};

export function optimizedImage(
  src: string,
  { type = 'display', width = 1200, format = 'webp' }: OptimizedOptions = {}
): string {
  const base = src.replace(/^\/images\//, '').replace(/\.[^.]+$/, '');
  return `/optimized/${type}/${base}-${width}.${format}`;
}
