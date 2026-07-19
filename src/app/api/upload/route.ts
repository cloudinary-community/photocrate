import { getCloudinary } from '@/lib/cloudinary-server';
import { getConfig } from '@/lib/config';
import {
  assertUploadAllowed,
  UploadValidationError,
  validateRemoteUploadUrl,
} from '@/lib/upload-validation';

export async function POST(request: Request) {
  try {
    const requestFormData = await request.formData();
    const skipCheck = requestFormData.get('skip-check') as string;

    assertUploadAllowed(skipCheck);

    const { assetsFolder } = getConfig();
    const cloudinary = getCloudinary();

    const file = requestFormData.get('file') as string;
    const publicId = requestFormData.get('publicId') as string;
    const tags = (requestFormData.getAll('tags') as Array<string>) || [];

    validateRemoteUploadUrl(file);

    const uploadOptions: Record<string, string | Array<string> | boolean> = {
      folder: assetsFolder,
    };

    if (typeof publicId === 'string' && publicId.length > 0) {
      uploadOptions.public_id = publicId.replace(`${assetsFolder}/`, '');
      uploadOptions.overwrite = true;
      uploadOptions.invalidate = true;
    }

    if (tags.length > 0) {
      uploadOptions.tags = tags;
    }

    const results = await cloudinary.uploader.upload(file, uploadOptions);

    return Response.json(results);
  } catch (error) {
    if (error instanceof UploadValidationError) {
      return new Response(error.message, { status: 401 });
    }

    throw error;
  }
}
