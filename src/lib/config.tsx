import { Focus } from 'lucide-react';
import themeConfig from '../../theme.config';

import { PhotoboxConfig } from '@/types/config';

export function getConfig() {
  const config: PhotoboxConfig = {
    // Customization

    logo: <Focus className="w-6 h-6" />,
    title: 'PhotoCrate',

    gallery: {
      crop: 'square'
    },

    editor: {
      // Background Removal requires the Cloudinary AI Background Removal Add-On
      backgroundRemoval: true
    },

    // Cloudinary asset management

    assetsFolder: process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_FOLDER || 'photocrate',
    assetsTag: process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_TAG || 'photocrate',
    libraryTag: process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG || 'photocrate-library',
    creationTag: process.env.NEXT_PUBLIC_CLOUDINARY_CREATION_TAG || 'photocrate-creation',
    favoritesTag: process.env.NEXT_PUBLIC_CLOUDINARY_FAVORITES_TAG || 'photocrate-favorite',
    trashTag: process.env.NEXT_PUBLIC_CLOUDINARY_TRASH_TAG || 'photocrate-trash',

    // Apply custom settings based on theme configuration

    ...themeConfig
  }

  return config;
}