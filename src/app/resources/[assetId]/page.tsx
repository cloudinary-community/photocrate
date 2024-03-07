import { getResourcebyAssetId } from '@/lib/cloudinary';

import MediaViewer from '@/components/MediaViewer';

async function Resource({ params }: { params: { assetId: string } }) {
  const { assetId } = params;
  const resource = await getResourcebyAssetId(assetId);  
  return <MediaViewer resource={resource} />
}

export default Resource;
