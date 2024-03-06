import { NextRequest } from 'next/server'
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  const requestFormData = await request.formData()
  const publicId = requestFormData.get('publicId') as string;
  const tags = (requestFormData.get('tags') as string)?.split(',');

  const results = await cloudinary.api.update(publicId, {
    tags
  })

  return Response.json({
    data: results
  });
}