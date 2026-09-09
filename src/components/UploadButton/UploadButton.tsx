"use client";

import { ReactNode } from 'react';
import { Upload } from 'lucide-react';
import { CloudinaryUploadWidgetResults } from 'next-cloudinary';

import { useResources } from '@/hooks/use-resources';
import { getConfig } from '@/lib/config';
import { isCloudinaryConfigured } from '@/lib/cloudinary-client';
import { CloudinaryResource } from '@/types/cloudinary';

import CldUploadButton from "@/components/CldUploadButton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface UploadButtonProps {
  children?: ReactNode
}

const UploadButton = ({ children }: UploadButtonProps) => {
  const { assetsFolder, assetsTag, libraryTag } = getConfig();

  const { addResources } = useResources({
    disableFetch: true,
    tag: libraryTag
  });

  async function handleOnSuccess(results: CloudinaryUploadWidgetResults) {
    if ( typeof results?.info === 'object' ) {
      addResources([results.info as CloudinaryResource]);
    }
  }

  function handleOnError(error: any) {
    console.log('error', error)
    // @TODO: Toast
  }

  const label = children || (
    <span className="flex items-center">
      <Upload className="mr-2 h-4 w-4" /> Upload
    </span>
  );

  if (!isCloudinaryConfigured()) {
    return (
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger className="flex items-center text-zinc-400" aria-label="Uploading is disabled">
            {label}
          </TooltipTrigger>
          <TooltipContent>
            <p>Cloudinary is not configured</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <CldUploadButton
      signatureEndpoint="/api/sign-cloudinary-params"
      options={{
        autoMinimize: true,
        resourceType: 'image',
        tags: [
          assetsTag,
          libraryTag,
        ],
        folder: assetsFolder
      }}
      onSuccess={handleOnSuccess}
      onError={handleOnError}
    >
      {label}
    </CldUploadButton>
  )
}

export default UploadButton;