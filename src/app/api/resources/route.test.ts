import { beforeEach, describe, expect, it, vi } from 'vitest';

const { getResourcesByTag } = vi.hoisted(() => ({
  getResourcesByTag: vi.fn(),
}));

vi.mock('@/lib/cloudinary', () => ({
  getResourcesByTag,
  DEFAULT_PAGE_SIZE: 30,
}));

import { GET } from '@/app/api/resources/route';

describe('GET /api/resources', () => {
  beforeEach(() => {
    getResourcesByTag.mockReset();
  });

  it('returns paginated resources', async () => {
    getResourcesByTag.mockResolvedValue({
      resources: [{ public_id: 'photocrate/a' }],
      nextCursor: 'page-2',
    });

    const response = await GET(
      new Request('http://localhost/api/resources?tag=photocrate-library')
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      data: [{ public_id: 'photocrate/a' }],
      nextCursor: 'page-2',
    });
  });

  it('forwards cursor pagination params', async () => {
    getResourcesByTag.mockResolvedValue({
      resources: [],
      nextCursor: null,
    });

    await GET(
      new Request(
        'http://localhost/api/resources?tag=photocrate-library&cursor=page-2&limit=10'
      )
    );

    expect(getResourcesByTag).toHaveBeenCalledWith('photocrate-library', {
      maxResults: 10,
      nextCursor: 'page-2',
    });
  });
});
