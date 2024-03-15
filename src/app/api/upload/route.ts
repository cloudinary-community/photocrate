import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
  const requestFormData = await request.formData()
  const file = requestFormData.get('file') as string;
  const publicId = requestFormData.get('publicId') as string;
  const tags = requestFormData.getAll('tags') as Array<string> || [];

  const uploadOptions: Record<string, string | Array<string> | boolean> = {
    tags: [String(process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_TAG), ...tags],
    folder: String(process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_FOLDER)
  };

  if ( typeof publicId === 'string' ) {
    // We're already including the folder in the above options, if the public ID
    // includes the folder in it as well, we need to strip it, otherwise the
    // upload will be attempted to be placed in folder/folder
    uploadOptions.public_id = publicId.replace(`${process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_FOLDER}/`, '');
    uploadOptions.overwrite = true;
    uploadOptions.invalidate = true;
  }
  
  const results = await cloudinary.uploader.upload(file, uploadOptions);

  return Response.json(results);
}