import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary';
import { getCldImageUrl } from 'next-cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
  const { publicId } = await request.json()

  const backgroundRemovedUrl = getCldImageUrl({
    src: publicId,
    removeBackground: true,
    format: 'png',
    quality: 'default'
  });

  async function checkStatus(url: string) {
    const resource = await fetch(url);

    if (!resource.ok) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(undefined)
        }, 500)
      });
      return await checkStatus(url);
    }

    return true;
  }

  await checkStatus(backgroundRemovedUrl);

  const uploadOptions: Record<string, string | Array<string> | boolean> = {
    tags: ['background-removed', `original-${publicId}`]
  };

  const backgroundRemovedResource = await cloudinary.uploader.upload(backgroundRemovedUrl, uploadOptions);

  const creationUrl = getCldImageUrl({
    src: publicId,
    version: Date.now(),
    grayscale: true,
    overlays: [{
      publicId: backgroundRemovedResource.public_id,
      width: '1.0',
      flags: ['relative']
    }]
  });

  return NextResponse.json({
    url: creationUrl
  });
}