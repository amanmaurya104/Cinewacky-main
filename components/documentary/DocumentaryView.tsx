import type { ComponentType } from 'react';
import type { Documentary } from '@/types/documentary';
import ArchiveDocumentary from './archive/ArchiveDocumentary';
import CraftDocumentary from './craft/CraftDocumentary';
import DragonDocumentary from './dragon/DragonDocumentary';
import PassageDocumentary from './passage/PassageDocumentary';
import RisingDocumentary from './rising/RisingDocumentary';
import RoadDocumentary from './road/RoadDocumentary';
import DocumentaryStandard from './standard/DocumentaryStandard';
import TuningDocumentary from './tuning/TuningDocumentary';

type ThemePage = ComponentType<{ documentary: Documentary }>;

// One entry per `theme` in data/documentaries/, plus `standard` for
// documentaries without one. A theme's stylesheet and fonts are not imported
// here but through PieceStyles, so a page links only its own theme's.
const THEMES: Record<NonNullable<Documentary['theme']> | 'standard', ThemePage> = {
  archive: ArchiveDocumentary,
  craft: CraftDocumentary,
  dragon: DragonDocumentary,
  passage: PassageDocumentary,
  rising: RisingDocumentary,
  road: RoadDocumentary,
  tuning: TuningDocumentary,
  standard: DocumentaryStandard,
};

export default function DocumentaryView({ documentary }: { documentary: Documentary }) {
  const ThemePage = THEMES[documentary.theme ?? 'standard'];
  return <ThemePage documentary={documentary} />;
}
