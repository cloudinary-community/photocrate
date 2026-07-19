import { getCloudinary } from '@/lib/cloudinary-server';
import { UploadSigningError, validateParamsToSign } from '@/lib/upload-signing';
import { isReadOnlyMode } from '@/lib/upload-validation';

export async function POST(request: Request) {
  if (isReadOnlyMode()) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const body = await request.json();
    const { paramsToSign } = body;
    const sanitizedParams = validateParamsToSign(paramsToSign);
    const cloudinary = getCloudinary();

    const signature = cloudinary.utils.api_sign_request(
      sanitizedParams,
      String(process.env.CLOUDINARY_API_SECRET)
    );

    return Response.json({ signature });
  } catch (error) {
    if (error instanceof UploadSigningError) {
      return new Response(error.message, { status: 400 });
    }

    throw error;
  }
}
