import { getCloudinary } from '@/lib/cloudinary-server';

export async function POST(request: Request) {
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
