import { ReactNode } from "react";

export interface PhotoboxConfig {
  logo?: ReactNode;
  title?: string;
  
  gallery?: {
    crop?: string;
  };

  editor?: {
    backgroundRemoval?: boolean;
  }

  assetsFolder: string;
  assetsTag: string;
  libraryTag: string;
  creationTag: string;
  favoritesTag: string;
  trashTag: string;
}


export interface ThemeConfig extends Partial<PhotoboxConfig> {}