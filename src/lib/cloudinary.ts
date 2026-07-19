import { getCloudinary } from '@/lib/cloudinary-server';

import { CloudinaryResource } from '@/types/cloudinary';

export const DEFAULT_PAGE_SIZE = 30;

export interface PaginatedResources {
  resources: Array<CloudinaryResource>;
  nextCursor: string | null;
}

export interface GetResourcesByTagOptions {
  maxResults?: number;
  nextCursor?: string;
}

/**
 * getResourcebyAssetId
 */

export async function getResourcebyAssetId(assetId: string) {
  const cloudinary = getCloudinary();
  const results = await cloudinary.api.resources_by_asset_ids(assetId, {
    tags: true,
  });
  return results?.resources?.[0] as unknown as CloudinaryResource;
}

/**
 * getResourcesByTag
 */

export async function getResourcesByTag(
  tag: string,
  options: GetResourcesByTagOptions = {}
): Promise<PaginatedResources> {
  const { maxResults = DEFAULT_PAGE_SIZE, nextCursor } = options;

  try {
    const cloudinary = getCloudinary();
    const result = await cloudinary.api.resources_by_tag(tag, {
      max_results: maxResults,
      ...(nextCursor ? { next_cursor: nextCursor } : {}),
      tags: true,
    });

    return {
      resources: (result.resources ?? []) as unknown as Array<CloudinaryResource>,
      nextCursor: result.next_cursor ?? null,
    };
  } catch {
    return {
      resources: [],
      nextCursor: null,
    };
  }
}
