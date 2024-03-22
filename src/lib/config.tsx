import { Focus } from 'lucide-react';
import themeConfig from '../../theme.config';

import { PhotoboxConfig } from '@/types/config';

export function getConfig() {
  const config: PhotoboxConfig = {
    // Customization

    logo: <Focus className="w-6 h-6" />,
    title: 'Photobox',

    // Cloudinary asset management

    assetsFolder: process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_FOLDER || 'photobox',
    assetsTag: process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_TAG || 'photobox',
    libraryTag: process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG || 'photobox-library',
    creationTag: process.env.NEXT_PUBLIC_CLOUDINARY_CREATION_TAG || 'photobox-creation',
    favoritesTag: process.env.NEXT_PUBLIC_CLOUDINARY_FAVORITES_TAG || 'photobox-favorite',
    trashTag: process.env.NEXT_PUBLIC_CLOUDINARY_TRASH_TAG || 'photobox-trash',

    // Apply custom settings based on theme configuration

    ...themeConfig
  }

  return config;
}