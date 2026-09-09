import { v2 as cloudinary } from 'cloudinary';

import { isCloudinaryConfigured } from '@/lib/cloudinary-client';

export { isCloudinaryConfigured };

let configured = false;

export function configureCloudinary() {
  if (configured) return cloudinary;

  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  configured = true;
  return cloudinary;
}

export function getCloudinary() {
  return configureCloudinary();
}
