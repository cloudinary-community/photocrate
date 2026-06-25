import { beforeEach, describe, expect, it, vi } from 'vitest';

const upload = vi.fn();

vi.mock('@/lib/cloudinary-server', () => ({
  getCloudinary: () => ({
    uploader: {
      upload,
    },
  }),
}));

import { POST } from '@/app/api/upload/route';

describe('POST /api/upload', () => {
  beforeEach(() => {
    upload.mockReset();
    delete process.env.NEXT_PUBLIC_PHOTOCRATE_MODE;
    delete process.env.NEXT_PUBLIC_PHOTOCRATE_DEMO_MODE;
  });

  it('uploads allowed Cloudinary URLs', async () => {
    upload.mockResolvedValue({ public_id: 'photocrate/new-image' });

    const formData = new FormData();
    formData.append(
      'file',
      'https://res.cloudinary.com/demo/image/upload/v123/sample.jpg'
    );
    formData.append('tags', 'photocrate');

    const response = await POST(
      new Request('http://localhost/api/upload', {
        method: 'POST',
        body: formData,
      })
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ public_id: 'photocrate/new-image' });
  });

  it('rejects non-Cloudinary URLs', async () => {
    const formData = new FormData();
    formData.append('file', 'https://example.com/image.jpg');

    const response = await POST(
      new Request('http://localhost/api/upload', {
        method: 'POST',
        body: formData,
      })
    );

    expect(response.status).toBe(401);
  });

  it('blocks uploads in read-only mode', async () => {
    process.env.NEXT_PUBLIC_PHOTOCRATE_MODE = 'read-only';

    const formData = new FormData();
    formData.append(
      'file',
      'https://res.cloudinary.com/demo/image/upload/v123/sample.jpg'
    );

    const response = await POST(
      new Request('http://localhost/api/upload', {
        method: 'POST',
        body: formData,
      })
    );

    expect(response.status).toBe(401);
  });

  it('allows demo uploads only when demo mode is enabled', async () => {
    process.env.NEXT_PUBLIC_PHOTOCRATE_MODE = 'read-only';
    upload.mockResolvedValue({ public_id: 'photocrate/demo' });

    const blockedFormData = new FormData();
    blockedFormData.append(
      'file',
      'https://res.cloudinary.com/demo/image/upload/v123/sample.jpg'
    );
    blockedFormData.append('skip-check', 'true');

    const blocked = await POST(
      new Request('http://localhost/api/upload', {
        method: 'POST',
        body: blockedFormData,
      })
    );
    expect(blocked.status).toBe(401);

    process.env.NEXT_PUBLIC_PHOTOCRATE_DEMO_MODE = 'true';

    const allowedFormData = new FormData();
    allowedFormData.append(
      'file',
      'https://res.cloudinary.com/demo/image/upload/v123/sample.jpg'
    );
    allowedFormData.append('skip-check', 'true');

    const allowed = await POST(
      new Request('http://localhost/api/upload', {
        method: 'POST',
        body: allowedFormData,
      })
    );

    expect(allowed.status).toBe(200);
  });
});
