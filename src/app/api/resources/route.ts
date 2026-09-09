import { getConfig } from '@/lib/config';
import { getResourcesByTag, DEFAULT_PAGE_SIZE } from '@/lib/cloudinary';

export async function GET(request: Request) {
  const { assetsTag } = getConfig();
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag') || assetsTag;
  const cursor = searchParams.get('cursor') || undefined;
  const limitParam = searchParams.get('limit');
  const maxResults = limitParam ? Math.min(Number(limitParam), 100) : DEFAULT_PAGE_SIZE;

  const { resources, nextCursor } = await getResourcesByTag(tag, {
    maxResults: Number.isFinite(maxResults) ? maxResults : DEFAULT_PAGE_SIZE,
    nextCursor: cursor,
  });

  return Response.json({
    data: resources,
    nextCursor,
  });
}
