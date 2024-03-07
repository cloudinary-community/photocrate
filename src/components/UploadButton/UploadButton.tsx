"use client";

import { Upload } from 'lucide-react';
import { CloudinaryUploadWidgetResults } from 'next-cloudinary';

import { useResources } from '@/hooks/use-resources';

import CldUploadButton from "@/components/CldUploadButton";

const UploadButton = () => {
  const { addResources } = useResources({
    disableFetch: true
  });

  async function handleOnSuccess(results: CloudinaryUploadWidgetResults) {
    if ( typeof results?.info === 'object' ) {
      addResources([results.info]);
    }
  }

  function handleOnError(error: any) {
    console.log('error', error)
    // @TODO: Toast
  }

  return (
    <CldUploadButton
      signatureEndpoint="/api/sign-cloudinary-params"
      options={{
        autoMinimize: true,
        resourceType: 'image',
        tags: [String(process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_TAG)],
        folder: String(process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_FOLDER)
      }}
      onSuccess={handleOnSuccess}
      onError={handleOnError}
    >
      <span className="flex items-center">
        <Upload className="mr-2 h-4 w-4" /> Upload
      </span>
    </CldUploadButton>
  )
}

export default UploadButton;