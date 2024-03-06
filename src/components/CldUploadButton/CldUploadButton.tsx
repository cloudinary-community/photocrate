"use client";

import { CldUploadButton as CldUploadButtonDefault, CldUploadButtonProps } from 'next-cloudinary';

const CldUploadButton = (props: CldUploadButtonProps) => {
  return (
    <CldUploadButtonDefault {...props} />
  );
}

export default CldUploadButton;