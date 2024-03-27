import { v2 as cloudinary } from 'cloudinary';

import { CloudinaryResource } from '@/types/cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * getResourcebyAssetId
 */

export async function getResourcebyAssetId(assetId: string) {
  const results = await cloudinary.api.resources_by_asset_ids(assetId, {
    tags: true
  });
  return results?.resources?.[0] as unknown as CloudinaryResource;
}

/**
 * getResourcesByTag
 */

export async function getResourcesByTag(tag: string) {
  try {
    const { resources } = await cloudinary.api.resources_by_tag(tag, {
      // @todo temporary 400 results - should include pagination
      max_results: 400,
      tags: true
    });
    return {
      resources: resources as unknown as Array<CloudinaryResource>
    };
  } catch(e) {
    return {
      resources: []
    }
  }
}