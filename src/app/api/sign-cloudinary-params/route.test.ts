import { beforeEach, describe, expect, it, vi } from 'vitest';

const apiSignRequest = vi.fn();

vi.mock('@/lib/cloudinary-server', () => ({
  getCloudinary: () => ({
    utils: {
      api_sign_request: apiSignRequest,
    },
  }),
}));

import { POST } from '@/app/api/sign-cloudinary-params/route';

describe('POST /api/sign-cloudinary-params', () => {
  beforeEach(() => {
    apiSignRequest.mockReset();
    delete process.env.NEXT_PUBLIC_PHOTOCRATE_MODE;
  });

  it('returns a signature for valid params', async () => {
    apiSignRequest.mockReturnValue('signed-hash');

    const response = await POST(
      new Request('http://localhost/api/sign-cloudinary-params', {
        method: 'POST',
        body: JSON.stringify({
          paramsToSign: {
            folder: 'photocrate',
            tags: ['photocrate', 'photocrate-library'],
            resource_type: 'image',
            timestamp: '123',
          },
        }),
      })
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ signature: 'signed-hash' });
    expect(apiSignRequest).toHaveBeenCalled();
  });

  it('rejects disallowed params', async () => {
    const response = await POST(
      new Request('http://localhost/api/sign-cloudinary-params', {
        method: 'POST',
        body: JSON.stringify({
          paramsToSign: {
            folder: 'photocrate',
            tags: ['photocrate', 'photocrate-library'],
            resource_type: 'image',
            timestamp: '123',
            upload_prefix: 'evil',
          },
        }),
      })
    );

    expect(response.status).toBe(400);
  });

  it('returns 401 in read-only mode', async () => {
    process.env.NEXT_PUBLIC_PHOTOCRATE_MODE = 'read-only';

    const response = await POST(
      new Request('http://localhost/api/sign-cloudinary-params', {
        method: 'POST',
        body: JSON.stringify({ paramsToSign: {} }),
      })
    );

    expect(response.status).toBe(401);
  });
});
