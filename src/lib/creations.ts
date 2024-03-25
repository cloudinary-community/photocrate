import { getCldImageUrl } from 'next-cloudinary';

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