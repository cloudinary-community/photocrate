import { CloudinaryResource } from '@/types/cloudinary';
import { getAssetsByTags } from '@/lib/cloudinary';

import MediaGallery from '@/components/MediaGallery';

export const revalidate = 10;

export default async function Home() {
  const { resources } = await getAssetsByTags(String(process.env.NEXT_PUBLIC_CLOUDINARY_FAVORITES_TAG), {
    excludeTags: [String(process.env.NEXT_PUBLIC_CLOUDINARY_TRASH_TAG)]
  });
  return (
    <div className="h-full mt-6">
      <MediaGallery
        resources={resources as unknown as Array<CloudinaryResource>}
        tag={String(process.env.NEXT_PUBLIC_CLOUDINARY_FAVORITES_TAG)}
      />
    </div>
  )
}