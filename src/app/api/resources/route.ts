import { NextRequest } from 'next/server'

import { getAssetsByTag } from '@/lib/cloudinary';


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tag = (searchParams.get('tag') as string) || String(process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_TAG);

  const resources = await getAssetsByTag(tag);

  return Response.json({
    data: resources
  });
}