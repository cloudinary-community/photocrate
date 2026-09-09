import { describe, expect, it } from 'vitest';

import {
  getFilterPreviewPreset,
  getThumbnailPreset,
  getViewerPreset,
  hashTransformations,
} from '@/lib/delivery-presets';

describe('delivery presets', () => {
  const resource = { width: 4000, height: 3000 };

  it('returns lazy-loading thumbnail presets', () => {
    const preset = getThumbnailPreset(resource, { crop: 'square' });
    expect(preset.width).toBe(700);
    expect(preset.height).toBe(700);
    expect(preset.loading).toBe('lazy');
    expect(preset.crop).toBe('fill');
  });

  it('returns priority viewer presets', () => {
    const preset = getViewerPreset(resource);
    expect(preset.priority).toBe(true);
    expect(preset.width).toBe(4000);
  });

  it('returns filter preview presets', () => {
    const preset = getFilterPreviewPreset();
    expect(preset.width).toBe(300);
    expect(preset.loading).toBe('lazy');
  });

  it('hashes transformations deterministically', () => {
    const hashA = hashTransformations({ crop: 'fill', grayscale: true });
    const hashB = hashTransformations({ grayscale: true, crop: 'fill' });
    expect(hashA).toBe(hashB);
  });
});
