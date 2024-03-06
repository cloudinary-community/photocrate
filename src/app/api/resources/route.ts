import { NextRequest } from 'next/server'

import { getAssetsByTags } from '@/lib/cloudinary';


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tag = (searchParams.get('tag') as string) || String(process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_TAG);

  const options: Record<string, string | Array<string>> = {};

  if ( tag !== String(process.env.NEXT_PUBLIC_CLOUDINARY_TRASH_TAG) ) {
    options.excludeTags = [String(process.env.NEXT_PUBLIC_CLOUDINARY_TRASH_TAG)]
  }

  const { resources } = await getAssetsByTags(tag, options);

  return Response.json({
    data: resources
  });
}