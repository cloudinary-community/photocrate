import { getCloudinary } from '@/lib/cloudinary-server';
import { isReadOnlyMode } from '@/lib/upload-validation';

export async function POST(request: Request) {
  if (isReadOnlyMode()) {
    return new Response('Unauthorized', { status: 401 });
  }

  const requestFormData = await request.formData();
  const publicId = requestFormData.get('publicId') as string;
  const tags = (requestFormData.get('tags') as string)?.split(',');
  const cloudinary = getCloudinary();

  const results = await cloudinary.api.update(publicId, {
    tags,
  });

  return Response.json({
    data: results,
  });
}
