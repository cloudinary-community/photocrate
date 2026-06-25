import { describe, expect, it } from 'vitest';

import { validateParamsToSign, UploadSigningError } from '@/lib/upload-signing';

describe('validateParamsToSign', () => {
  const validParams = {
    folder: 'photocrate',
    tags: ['photocrate', 'photocrate-library'],
    resource_type: 'image',
    timestamp: '1234567890',
  };

  it('accepts valid upload parameters', () => {
    const result = validateParamsToSign(validParams);
    expect(result.folder).toBe('photocrate');
    expect(result.tags).toEqual(['photocrate', 'photocrate-library']);
    expect(result.resource_type).toBe('image');
  });

  it('accepts comma-separated tags', () => {
    const result = validateParamsToSign({
      ...validParams,
      tags: 'photocrate,photocrate-library',
    });
    expect(result.tags).toEqual(['photocrate', 'photocrate-library']);
  });

  it('rejects unknown parameters', () => {
    expect(() =>
      validateParamsToSign({ ...validParams, evil: 'payload' })
    ).toThrow(UploadSigningError);
  });

  it('rejects invalid folder', () => {
    expect(() =>
      validateParamsToSign({ ...validParams, folder: 'other-folder' })
    ).toThrow(/Folder must be/);
  });

  it('rejects missing required tags', () => {
    expect(() =>
      validateParamsToSign({ ...validParams, tags: ['photocrate'] })
    ).toThrow(/Tags must include/);
  });

  it('rejects non-image resource types', () => {
    expect(() =>
      validateParamsToSign({ ...validParams, resource_type: 'video' })
    ).toThrow(/Only image uploads are allowed/);
  });
});
