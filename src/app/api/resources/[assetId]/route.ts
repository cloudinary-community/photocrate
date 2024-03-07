import { getResourcebyAssetId } from '@/lib/cloudinary';

export async function GET(request: Request, { params }: { params: { assetId: string } }) {
  const resource = await getResourcebyAssetId(params?.assetId);
  return Response.json({
    data: resource
  });
}