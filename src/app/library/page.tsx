import { CloudinaryResource } from '@/types/cloudinary';
import { getAssetsByTag } from '@/lib/cloudinary';

import MediaGallery from '@/components/MediaGallery';

export default async function Home() {
  const resources = await getAssetsByTag(String(process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_TAG));
  return (
    <div className="h-full mt-6">
      <MediaGallery
        resources={resources as unknown as Array<CloudinaryResource>}
        tag={String(process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_TAG)}
      />
    </div>
  )
}