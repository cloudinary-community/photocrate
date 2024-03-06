import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * getAssetsByTags
 */

interface GetAssetsByTagsOptions {
  excludeTags?: string | Array<string>;
}

export async function getAssetsByTags(tags: string | Array<string>, options?: GetAssetsByTagsOptions) {
  const tagsToSearch = Array.isArray(tags) ? tags : [tags];
  const tagsToExclude = options?.excludeTags && (Array.isArray(options?.excludeTags) ? options.excludeTags : [options.excludeTags]);
  
  let tagExpression = `folder=${String(process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_FOLDER)}`;

  if ( Array.isArray(tagsToSearch) ) {
    tagsToSearch.forEach(tag => {
      tagExpression = `${tagExpression} AND tags="${tag}"`;
    });
  }
  
  if ( Array.isArray(tagsToExclude) ) {
    tagsToExclude.forEach(tag => {
      tagExpression = `${tagExpression} AND -tags="${tag}"`;
    });
  }

  const { resources, total_count } = await cloudinary.search
    .expression(tagExpression)
    .with_field('tags')
    .execute();

  return {
    resources,
    count: total_count
  };
}