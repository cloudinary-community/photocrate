import { NextResponse } from 'next/server'
import { getCldImageUrl } from 'next-cloudinary';

import { createHashFromString } from '@/lib/utils';

export const runtime = 'edge';

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


  const timestamp = Date.now();

  const formData = new FormData();

  const parameters: Record<string, string> = {
    // tags: ['background-removed', `original-${publicId}`]
  }

  Object.keys(parameters).sort().forEach(key => {
    formData.append(key, String(parameters[key]));
  });

  const paramsString = Object.keys(parameters).map(key => `${key}=${parameters[key]}`).join('&');

  // const paramsHash = await createHashFromString(`${paramsString}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`);
  const paramsHash = await createHashFromString(`timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`);

  formData.append('file', backgroundRemovedUrl);
  formData.append('api_key', String(process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY));
  formData.append('timestamp', String(timestamp));
  formData.append('signature', paramsHash);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    }).then(r => r.json());

    if ( response.error ) {
      throw new Error(response.error?.message);
    }

    const creationUrl = getCldImageUrl({
      src: publicId,
      version: Date.now(),
      grayscale: true,
      overlays: [{
        publicId: response.public_id,
        width: '1.0',
        flags: ['relative']
      }]
    });
  
    return NextResponse.json({
      url: creationUrl
    });
  } catch(e) {
    console.log('e', e)
    return new Response(JSON.stringify({ error: e }), {
      status: 500
    })
  }
}