"use client";

import { CldImage as CldImageDefault, CldImageProps as CldImagePropsDefault } from 'next-cloudinary';
import { ImageProps } from 'next/image';

const shimmerTheme: Record<string, { base: string; highlight: string; }> = {
  light: {
    base: '#e8e8e8',
    highlight: '#efefef',
  },
  dark: {
    base: '#18181b',
    highlight: '#202023',
  },
}

const shimmer = (w: number, h: number, placeholderStyle: string = 'light') => {
  const theme = shimmerTheme[placeholderStyle];
  return `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="${theme.base}" offset="20%" />
          <stop stop-color="${theme.highlight}" offset="50%" />
          <stop stop-color="${theme.base}" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="${theme.base}" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>
  `
};

function toBase64(str: string) {
  return typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);
}

interface CldImageProps extends CldImagePropsDefault {
  placeholderStyle?: string;
}

const CldImage = ({ placeholderStyle, ...props }: CldImageProps) => {
  let dataUrl;

  if ( typeof props.width === 'number' && typeof props.height === 'number' ) {
    dataUrl = `data:image/svg+xml;base64,${toBase64(shimmer(props.width, props.height, placeholderStyle))}`;
  }

  return <CldImageDefault {...props} placeholder={dataUrl as ImageProps["placeholder"]} />
}

export default CldImage;