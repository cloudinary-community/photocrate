export class UploadValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UploadValidationError';
  }
}

const ALLOWED_CLOUDINARY_HOSTS = [
  'res.cloudinary.com',
  'cloudinary.com',
];

export function isAllowedCloudinaryUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return false;
    return ALLOWED_CLOUDINARY_HOSTS.some(
      (host) => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`)
    );
  } catch {
    return false;
  }
}

export function validateRemoteUploadUrl(url: string): void {
  if (!url || typeof url !== 'string') {
    throw new UploadValidationError('A valid file URL is required');
  }

  if (!isAllowedCloudinaryUrl(url)) {
    throw new UploadValidationError('Upload source must be a Cloudinary delivery URL');
  }
}

export function isDemoUploadAllowed(): boolean {
  return process.env.NEXT_PUBLIC_PHOTOCRATE_DEMO_MODE === 'true';
}

export function isReadOnlyMode(): boolean {
  return process.env.NEXT_PUBLIC_PHOTOCRATE_MODE === 'read-only';
}

export function assertUploadAllowed(skipCheck?: string): void {
  if (isReadOnlyMode() && skipCheck !== 'true') {
    throw new UploadValidationError('Unauthorized');
  }

  if (isReadOnlyMode() && skipCheck === 'true' && !isDemoUploadAllowed()) {
    throw new UploadValidationError('Demo uploads are disabled in read-only mode');
  }
}
