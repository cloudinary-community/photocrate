import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  if ( process.env.NEXT_PUBLIC_PHOTOBOX_MODE === 'read-only' ) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  const requestFormData = await request.formData()
  const publicId = requestFormData.get('publicId') as string;

  const results = await cloudinary.api.delete_resources([publicId]);

  return Response.json(results);
}