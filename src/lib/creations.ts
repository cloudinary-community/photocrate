import { getCldImageUrl } from 'next-cloudinary';

import { checkStatus } from '@/lib/utils';

import { CloudinaryResource } from '@/types/cloudinary';

/**
 * Collages
 */

const collageTemplates: Record<number, Function> = {
  1: (publicIds: Array<CloudinaryResource["public_id"]>) => {
    return {
      overlays: [
        {
          publicId: publicIds[0],
          width: 1200,
          height: 1200,
          crop: 'fill',
          gravity: 'auto'
        }
      ]
    }
  },
  2: (publicIds: Array<CloudinaryResource["public_id"]>) => {
    return {
      overlays: [
        {
          publicId: publicIds[0],
          position: {
            gravity: 'west'
          },
          width: 600,
          height: 1200,
          crop: 'fill',
          gravity: 'auto'
        },
        {
          publicId: publicIds[1],
          position: {
            gravity: 'east'
          },
          width: 600,
          height: 1200,
          crop: 'fill',
          gravity: 'auto'
        },
      ]
    }
  },
  3: (publicIds: Array<CloudinaryResource["public_id"]>) => {
    return {
      overlays: [
        {
          publicId: publicIds[0],
          position: {
            gravity: 'west'
          },
          width: 600,
          height: 1200,
          crop: 'fill',
          gravity: 'auto'
        },
        {
          publicId: publicIds[1],
          position: {
            gravity: 'north_east'
          },
          width: 600,
          height: 600,
          crop: 'fill',
          gravity: 'auto'
        },
        {
          publicId: publicIds[2],
          position: {
            gravity: 'south_east'
          },
          width: 600,
          height: 600,
          crop: 'fill',
          gravity: 'auto'
        },
      ]
    }
  },
  4: (publicIds: Array<CloudinaryResource["public_id"]>) => {
    return {
      overlays: [
        {
          publicId: publicIds[0],
          position: {
            gravity: 'north_west'
          },
          width: 600,
          height: 600,
          crop: 'fill',
          gravity: 'auto'
        },
        {
          publicId: publicIds[1],
          position: {
            gravity: 'north_east'
          },
          width: 600,
          height: 600,
          crop: 'fill',
          gravity: 'auto'
        },
        {
          publicId: publicIds[2],
          position: {
            gravity: 'south_west'
          },
          width: 600,
          height: 600,
          crop: 'fill',
          gravity: 'auto'
        },
        {
          publicId: publicIds[3],
          position: {
            gravity: 'south_east'
          },
          width: 600,
          height: 600,
          crop: 'fill',
          gravity: 'auto'
        },
      ]
    }
  },
}

export function getCollage(publicIds: Array<CloudinaryResource["public_id"]>) {
  const template = collageTemplates[publicIds.length];

  if ( typeof template !== 'function' ) {
    throw new Error('No template found.');
  };

  return getCldImageUrl({
    src: publicIds[0],
    width: 1200,
    height: 1200,
    crop: {
      type: 'fill',
      source: true
    },
    effects: [{
      colorize: '100,co_white',
      background: 'white',
    }],
    version: Date.now(),
    ...template(publicIds)
  })
}

/**
 * Animations
 */

const animationTemplates: Record<number, Function> = {
  1: () => {
    return {
      zoompan: {
        loop: true,
        options: 'to_(g_auto;zoom_1.4)'
      },
    }
  },
}

export function getAnimation(publicIds: Array<CloudinaryResource["public_id"]>) {
  const template = animationTemplates[publicIds.length];

  if ( typeof template !== 'function' ) {
    throw new Error('No template found.');
  };

  return getCldImageUrl({
    src: publicIds[0],
    width: 1200,
    height: 1200,
    version: Date.now(),
    format: 'gif',
    ...template(publicIds)
  })
}

/**
 * Color Pop
 */

export async function getColorPop(publicId: CloudinaryResource["public_id"]) {
  const backgroundRemovedUrl = getCldImageUrl({
    src: publicId,
    removeBackground: true,
    format: 'png',
    quality: 'default'
  });

  await checkStatus(backgroundRemovedUrl);

  const formData = new FormData();

  // Skip READONLY check so the demo can still preview Color Pop (without saving result)
  formData.append('skip-check', String(true));
  formData.append('file', backgroundRemovedUrl);
  formData.append('tags', 'background-removed');
  formData.append('tags', `original-${publicId}`);

  const backgroundRemovedResource = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  }).then(r => r.json());

  return getCldImageUrl({
    width: 1200,
    height: 1200,
    src: publicId,
    crop: {
      type: 'fill',
      source: true,
      gravity: 'center'
    },
    version: Date.now(),
    grayscale: true,
    overlays: [{
      publicId: backgroundRemovedResource.public_id,
      width: 1200,
      height: 1200,
      crop: 'fill',
      position: {
        gravity: 'center'
      },
    }]
  });
}