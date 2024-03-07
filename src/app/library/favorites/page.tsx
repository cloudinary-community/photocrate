import { getResourcesByTag } from '@/lib/cloudinary';

import MediaGallery from '@/components/MediaGallery';

export const revalidate = 10;

export default async function Home() {
  const { resources } = await getResourcesByTag(String(process.env.NEXT_PUBLIC_CLOUDINARY_FAVORITES_TAG));
  return (
    <div className="h-full mt-6">
      <MediaGallery
        resources={resources}
        tag={String(process.env.NEXT_PUBLIC_CLOUDINARY_FAVORITES_TAG)}
      />
    </div>
  )
}