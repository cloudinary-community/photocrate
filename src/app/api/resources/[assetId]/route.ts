import { getResourcebyAssetId } from '@/lib/cloudinary';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ assetId: string }> }
) {
  const { assetId } = await params;
  const resource = await getResourcebyAssetId(assetId);
  return Response.json({
    data: resource,
  });
}
