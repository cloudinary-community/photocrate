import { NextRequest } from 'next/server'

import { getConfig } from '@/lib/config';
import { getResourcesByTag } from '@/lib/cloudinary';

export async function GET(request: NextRequest) {
  const { assetsTag } = getConfig();
  const searchParams = request.nextUrl.searchParams;
  const tag = (searchParams.get('tag') as string) || assetsTag;
  const { resources } = await getResourcesByTag(tag);
  return Response.json({
    data: resources
  });
}