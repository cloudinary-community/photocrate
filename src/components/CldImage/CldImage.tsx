"use client";

import { CldImage as CldImageDefault, CldImageProps } from 'next-cloudinary';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';

const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <rect width="${w}" height="${h}" fill="#e8e8e8" />
  </svg>
`;

function toBase64(str: string) {
  return typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);
}

const CldImage = (props: CldImageProps) => {
  let dataUrl;

  if ( typeof props.width === 'number' && typeof props.height === 'number' ) {
    dataUrl = `data:image/svg+xml;base64,${toBase64(shimmer(props.width, props.height))}`;
  }

  return <CldImageDefault {...props} placeholder={dataUrl as PlaceholderValue} />
}

export default CldImage;