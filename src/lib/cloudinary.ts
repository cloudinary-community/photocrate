import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getAssetsByTag(tag: string) {
  const { resources } = await cloudinary.api.resources_by_tag(tag, {
    tags: true,
    max_results: 30
  });
  return resources;
}