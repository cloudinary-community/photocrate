import { CldImageProps } from 'next-cloudinary';

import { CloudinaryResource } from '@/types/cloudinary';
import { PhotoboxConfig } from '@/types/config';

export const GALLERY_SIZES =
  '(min-width: 1280px) calc(20vw - 2.4rem), (min-width: 1024px) calc(25vw - 3rem), (min-width: 768px) calc(33.33vw - 4rem), 50vw';

export function getThumbnailPreset(
  resource: Pick<CloudinaryResource, 'width' | 'height'>,
  gallery?: PhotoboxConfig['gallery']
): Omit<CldImageProps, 'src' | 'alt'> {
  const config: Omit<CldImageProps, 'src' | 'alt'> = {
    width: resource.width,
    height: resource.height,
    sizes: GALLERY_SIZES,
    loading: 'lazy',
  };

  if (gallery?.crop === 'square') {
    config.width = 700;
    config.height = 700;
    config.crop = 'fill';
  }

  return config;
}

export function getViewerPreset(
  resource: Pick<CloudinaryResource, 'width' | 'height'>
): Omit<CldImageProps, 'src' | 'alt'> {
  return {
    width: resource.width,
    height: resource.height,
    priority: true,
    sizes: '100vw',
  };
}

export function getCreationPreviewPreset(): Omit<CldImageProps, 'src' | 'alt'> {
  return {
    width: 1200,
    height: 1200,
    sizes: '100vw',
    loading: 'lazy',
  };
}

export function getFilterPreviewPreset(): Omit<CldImageProps, 'src' | 'alt'> {
  return {
    width: 300,
    height: 300,
    crop: {
      type: 'fill',
      source: true,
    },
    loading: 'lazy',
  };
}

export function hashTransformations(transformations: Record<string, unknown>): string {
  return Object.entries(transformations)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}:${JSON.stringify(value)}`)
    .join('|');
}
