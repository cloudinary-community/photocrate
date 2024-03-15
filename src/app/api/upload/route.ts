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
    folder: String(process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_FOLDER)
  };

  if ( typeof publicId === 'string' ) {
    // We're already including the folder in the above options, if the public ID
    // includes the folder in it as well, we need to strip it, otherwise the
    // upload will be attempted to be placed in folder/folder

    uploadOptions.public_id = publicId.replace(`${process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_FOLDER}/`, '');
    uploadOptions.overwrite = true;
    uploadOptions.invalidate = true;

    // If the upload request is explicitly defining a set of tags, still apply these
    // in the event they are intended to overwrite the existing tags

    if ( tags ) {
      uploadOptions.tags = tags;
    }
  } else {
    // We only want to add tags if we're uploading a new image to avoid overwriting existing
    // tags on an image, which would presumably have the standard tags already applied

    uploadOptions.tags = [
      String(process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_TAG),
      String(process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG),
      ...tags,
    ]
  }

  const results = await cloudinary.uploader.upload(file, uploadOptions);

  return Response.json(results);
}