import { getConfig } from '@/lib/config';
import { getResourcesByTag } from '@/lib/cloudinary';

import MediaGallery from '@/components/MediaGallery';

export const revalidate = 10;

export default async function Home() {
  const { trashTag } = getConfig();
  const { resources } = await getResourcesByTag(trashTag);
  return (
    <div className="h-full mt-6">
      <MediaGallery
        resources={resources}
        tag={trashTag}
      />
    </div>
  )
}