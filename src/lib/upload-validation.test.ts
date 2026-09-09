import { describe, expect, it } from 'vitest';

import {
  isAllowedCloudinaryUrl,
  validateRemoteUploadUrl,
  UploadValidationError,
} from '@/lib/upload-validation';

describe('upload validation', () => {
  it('allows Cloudinary delivery URLs', () => {
    expect(
      isAllowedCloudinaryUrl(
        'https://res.cloudinary.com/demo/image/upload/v123/sample.jpg'
      )
    ).toBe(true);
  });

  it('rejects non-Cloudinary URLs', () => {
    expect(isAllowedCloudinaryUrl('https://example.com/image.jpg')).toBe(false);
  });

  it('rejects non-https URLs', () => {
    expect(
      isAllowedCloudinaryUrl('http://res.cloudinary.com/demo/image/upload/sample.jpg')
    ).toBe(false);
  });

  it('throws for invalid remote upload URLs', () => {
    expect(() => validateRemoteUploadUrl('https://evil.com/image.jpg')).toThrow(
      UploadValidationError
    );
  });
});
