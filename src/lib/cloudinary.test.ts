import { beforeEach, describe, expect, it, vi } from 'vitest';

const resourcesByTag = vi.fn();

vi.mock('@/lib/cloudinary-server', () => ({
  getCloudinary: () => ({
    api: {
      resources_by_tag: resourcesByTag,
    },
  }),
}));

import { getResourcesByTag, DEFAULT_PAGE_SIZE } from '@/lib/cloudinary';

describe('getResourcesByTag', () => {
  beforeEach(() => {
    resourcesByTag.mockReset();
  });

  it('returns paginated resources with next cursor', async () => {
    resourcesByTag.mockResolvedValue({
      resources: [{ public_id: 'photocrate/a' }],
      next_cursor: 'cursor-2',
    });

    const result = await getResourcesByTag('photocrate-library');

    expect(resourcesByTag).toHaveBeenCalledWith('photocrate-library', {
      max_results: DEFAULT_PAGE_SIZE,
      tags: true,
    });
    expect(result.resources).toHaveLength(1);
    expect(result.nextCursor).toBe('cursor-2');
  });

  it('passes cursor for subsequent pages', async () => {
    resourcesByTag.mockResolvedValue({
      resources: [],
      next_cursor: null,
    });

    await getResourcesByTag('photocrate-library', {
      nextCursor: 'cursor-2',
      maxResults: 10,
    });

    expect(resourcesByTag).toHaveBeenCalledWith('photocrate-library', {
      max_results: 10,
      next_cursor: 'cursor-2',
      tags: true,
    });
  });

  it('returns empty results when the API fails', async () => {
    resourcesByTag.mockRejectedValue(new Error('API error'));

    const result = await getResourcesByTag('photocrate-library');

    expect(result).toEqual({ resources: [], nextCursor: null });
  });
});
