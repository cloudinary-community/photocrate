import { getResourcebyAssetId } from '@/lib/cloudinary';

import MediaViewer from '@/components/MediaViewer';

async function Resource({ params }: { params: Promise<{ assetId: string }> }) {
  const { assetId } = await params;
  const resource = await getResourcebyAssetId(assetId);
  return <MediaViewer resource={resource} />
}

export default Resource;
