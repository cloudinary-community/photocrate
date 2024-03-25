import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
  if ( process.env.NEXT_PUBLIC_PHOTOBOX_MODE === 'read-only' ) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  const body = await request.json();
  const { paramsToSign } = body;

  const signature = cloudinary.utils.api_sign_request(paramsToSign, String(process.env.CLOUDINARY_API_SECRET));

  return Response.json({ signature });
}