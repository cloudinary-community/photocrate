import { v2 as cloudinary } from 'cloudinary';

import { CloudinaryResource } from '@/types/cloudinary';

import MediaViewer from '@/components/MediaViewer';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function Resource({ params }: { params: { assetId: string } }) {
  const { assetId } = params;
  
  const results = await cloudinary.api.resources_by_asset_ids(assetId, {
    tags: true
  })
  
  return <MediaViewer resource={results.resources?.[0] as unknown as CloudinaryResource} />
}

export default Resource;
