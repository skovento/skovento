import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Responsive photo: fixed aspect ratio (no layout shift), modern formats and sizes via next/image,
 * lazy-loaded unless `priority`. Admin-entered external links are served as-is.
 */
export function Photo({
  src, alt, sizes, priority = false, ratio = '16 / 10', className, rounded = true,
}: { src: string; alt: string; sizes: string; priority?: boolean; ratio?: string; className?: string; rounded?: boolean }) {
  const external = /^https?:\/\//i.test(src);
  return (
    <div className={cn('relative overflow-hidden bg-raised', rounded && 'rounded-2xl', className)} style={{ aspectRatio: ratio }}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} unoptimized={external} className="object-cover" />
    </div>
  );
}
