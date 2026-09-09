import { getConfig } from '@/lib/config';

const ALLOWED_SIGN_PARAM_KEYS = new Set([
  'folder',
  'tags',
  'resource_type',
  'timestamp',
  'upload_preset',
  'context',
  'public_id',
  'api_key',
  // Added by the Cloudinary Upload Widget to mark uploads as
  // originating from the widget (e.g. "uw"); harmless metadata.
  'source',
]);

export class UploadSigningError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UploadSigningError';
  }
}

export function validateParamsToSign(
  paramsToSign: Record<string, unknown> | null | undefined
): Record<string, string | string[]> {
  if (!paramsToSign || typeof paramsToSign !== 'object') {
    throw new UploadSigningError('paramsToSign is required');
  }

  const { assetsFolder, assetsTag, libraryTag } = getConfig();
  const sanitized: Record<string, string | string[]> = {};

  for (const [key, value] of Object.entries(paramsToSign)) {
    if (!ALLOWED_SIGN_PARAM_KEYS.has(key)) {
      throw new UploadSigningError(`Parameter "${key}" is not allowed for signing`);
    }

    if (value === undefined || value === null) continue;

    if (key === 'folder') {
      if (value !== assetsFolder) {
        throw new UploadSigningError(`Folder must be "${assetsFolder}"`);
      }
      sanitized.folder = String(value);
      continue;
    }

    if (key === 'tags') {
      const tags = normalizeTags(value);
      if (!tags.includes(assetsTag)) {
        throw new UploadSigningError(`Tags must include "${assetsTag}"`);
      }
      if (!tags.includes(libraryTag)) {
        throw new UploadSigningError(`Tags must include "${libraryTag}"`);
      }
      sanitized.tags = tags;
      continue;
    }

    if (key === 'resource_type') {
      if (value !== 'image') {
        throw new UploadSigningError('Only image uploads are allowed');
      }
      sanitized.resource_type = 'image';
      continue;
    }

    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      sanitized[key] = String(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(String);
    }
  }

  if (!sanitized.folder) {
    throw new UploadSigningError(`Folder must be "${assetsFolder}"`);
  }

  if (!sanitized.tags) {
    throw new UploadSigningError('Tags are required for signing');
  }

  return sanitized;
}

function normalizeTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String);
  }

  if (typeof value === 'string') {
    return value.split(',').map((tag) => tag.trim()).filter(Boolean);
  }

  throw new UploadSigningError('Tags must be a string or array');
}
