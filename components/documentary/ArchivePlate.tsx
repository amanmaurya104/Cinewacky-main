import Image from 'next/image';
import type { DocumentaryPlate } from '@/types/documentary';

type Props = {
  plate: DocumentaryPlate;
  sizes: string;
  className?: string;
};

/**
 * A mounted plate: the image sits inside a paper mount with its number pressed
 * into the margin, the way a frame enlargement is filed. The number is read off
 * the filename rather than stored twice — the build script assigns it.
 */
export default function ArchivePlate({ plate, sizes, className }: Props) {
  const number = plateNumber(plate.src);

  return (
    <figure className={className ? `archive-plate ${className}` : 'archive-plate'}>
      <div className="archive-plate-window">
        <Image
          src={plate.src}
          alt={plate.caption ?? ''}
          fill
          sizes={sizes}
          quality={75}
          loading="lazy"
        />
      </div>

      {number || plate.caption ? (
        <figcaption className="archive-plate-slip">
          {number ? <span className="archive-plate-number">Pl. {number}</span> : null}
          {plate.caption ? <span>{plate.caption}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function plateNumber(src: string): string | undefined {
  return /plate-(\d+)\./.exec(src)?.[1];
}
