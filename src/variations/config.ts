import type { VariationId, VariationConfig } from './types';

export const variations: Record<VariationId, VariationConfig> = {
  v1: {
    id: 'v1',
    name: 'Minimal',
    subtitle: 'Clean, Swiss, Restrained',
    fontFamily: 'DM Sans',
    fontUrl:
      'https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600;700&display=swap',
  },
  v2: {
    id: 'v2',
    name: 'Bold',
    subtitle: 'High-Impact, Dramatic',
    fontFamily: 'Plus Jakarta Sans',
    fontUrl:
      'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap',
  },
  v3: {
    id: 'v3',
    name: 'Playful',
    subtitle: 'Energetic, Approachable',
    fontFamily: 'Outfit',
    fontUrl:
      'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap',
  },
  v4: {
    id: 'v4',
    name: 'Corporate',
    subtitle: 'Professional, Structured',
    fontFamily: 'Sora',
    fontUrl:
      'https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap',
  },
};

export const variationIds = Object.keys(variations) as VariationId[];
