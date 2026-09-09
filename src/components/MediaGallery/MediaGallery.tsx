"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Plus, X, Save, LayoutPanelLeft, Loader2, SquareStack, Droplet, Sparkles, Star, Upload } from 'lucide-react';

import { useResources } from "@/hooks/use-resources";
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { CloudinaryResource } from '@/types/cloudinary';
import { getConfig } from '@/lib/config';
import { getAnimation, getCollage, getColorPop } from "@/lib/creations";
import { getCreationPreviewPreset, getThumbnailPreset } from '@/lib/delivery-presets';
import { cn } from '@/lib/utils';

import CldImage from '@/components/CldImage';
import Container from '@/components/Container';
import UploadButton from '@/components/UploadButton';
import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useKeydown } from '@/hooks/use-keydown';

interface MediaGalleryProps {
  resources?: Array<CloudinaryResource>;
  tag?: string;
}

interface Creation {
  state: string;
  type: string;
  url?: string;
}

const MediaGallery = ({ resources: initialResources, tag }: MediaGalleryProps) => {
  const { assetsTag, libraryTag, creationTag, favoritesTag, gallery } = getConfig();
  const {
    resources,
    addResources,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useResources({ initialResources, tag });

  const sentinelRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    onLoadMore: () => fetchNextPage(),
  });

  const [selected, setSelected] = useState<Array<string>>([]);
  const [creation, setCreation] = useState<Creation>();

  useKeydown({
    key: "Escape",
    handler: (_event: KeyboardEvent) => {
      setSelected([]);
    },
    element: typeof document !== "undefined" ?  document.body : null
  });

  function handleOnClearSelection() {
    setSelected([]);
  }

  async function handleOnCreateAnimation() {
    if ( !Array.isArray(selected) || selected.length <= 0 ) return;
    const url = getAnimation(selected);
    setCreation({
      state: 'created',
      type: 'animation',
      url,
    });
  }

  async function handleOnCreateCollage() {
    if ( !Array.isArray(selected) || selected.length <= 0 ) return;
    const url = getCollage(selected);
    setCreation({
      state: 'created',
      type: 'collage',
      url,
    });
  }

  async function handleOnCreateColorPop() {
    if ( !Array.isArray(selected) || selected.length !== 1 ) return;

    setCreation({
      state: 'creating',
      type: 'color-pop',
      url: undefined
    });

    const url = await getColorPop(selected[0]);

    setCreation({
      state: 'created',
      type: 'color-pop',
      url
    });
  }

  function handleOnCreationOpenChange(isOpen: boolean) {
    if ( !isOpen ) {
      setCreation(undefined);
    }
  }

  async function handleOnSaveCreation() {
    if ( typeof creation?.url !== 'string' || typeof creation?.type !== 'string' ) return;

    setCreation((prev) => {
      if ( !prev ) return undefined;
      return {
        ...prev,
        state: 'saving',
      }
    });

    const formData = new FormData();

    formData.append('file', creation.url);
    formData.append('tags', creationTag);
    formData.append('tags', assetsTag);
    formData.append('tags', libraryTag);

    await fetch(creation.url);

    const resource = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    }).then(r => r.json())

    setCreation(undefined);

    addResources([resource]);

    handleOnClearSelection();
  }

  const creationPreviewPreset = getCreationPreviewPreset();

  return (
    <>
      <Dialog open={!!creation} onOpenChange={handleOnCreationOpenChange}>
        <DialogContent>
          {creation?.state === 'creating' && (
            <div className="flex items-center justify-center p-14">
              <Loader2 className="text-zinc-400 h-14 w-14 animate-spin" />
            </div>
          )}
          {creation?.state && ['created', 'saving'].includes(creation.state) && (
            <>
              <DialogHeader>
                <DialogTitle>Save your creation?</DialogTitle>
              </DialogHeader>
              <div>
                {creation?.url && (
                  <CldImage
                    src={creation?.url}
                    alt="creation"
                    preserveTransformations
                    {...creationPreviewPreset}
                  />
                )}
              </div>
              <DialogFooter className="justify-end sm:justify-end">
                {process.env.NEXT_PUBLIC_PHOTOCRATE_MODE !== 'read-only' && (
                  <Button onClick={handleOnSaveCreation} disabled={creation?.state === 'saving'}>
                    {creation?.state === 'saving' && (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    )}
                    {creation?.state !== 'saving' && (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save to Library
                  </Button>
                )}
                {process.env.NEXT_PUBLIC_PHOTOCRATE_MODE === 'read-only' && (
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger className={`${buttonVariants()} text-blue-200 hover:text-blue-200 opacity-70`} aria-label="Saving is disabled">
                        <Save className="h-4 w-4 mr-2" />
                        Save to Library
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Saving is Disabled</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {selected.length > 0 && (
        <Container className="fixed z-50 top-0 left-0 w-full h-16 flex items-center justify-between gap-4 bg-white shadow-lg">
          <div className="flex items-center gap-4">
            <ul>
              <li>
                <Button variant="ghost" onClick={handleOnClearSelection}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Clear Selected</span>
                </Button>
              </li>
            </ul>
            <p>
              <span>{ selected?.length } Selected</span>
            </p>
          </div>
          <ul className="flex items-center gap-4">
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <Plus className="h-6 w-6" />
                    <span className="sr-only">Create New</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>

                    {selected.length === 1 && (
                      <DropdownMenuItem onClick={handleOnCreateAnimation}>
                        <SquareStack className="mr-2 h-4 w-4" />
                        <span>Animation</span>
                      </DropdownMenuItem>
                    )}
                    {selected.length > 0 && selected.length <= 4 && (
                      <DropdownMenuItem onClick={handleOnCreateCollage}>
                        <LayoutPanelLeft className="mr-2 h-4 w-4" />
                        <span>Collage</span>
                      </DropdownMenuItem>
                    )}

                    {selected.length === 1 && (
                      <DropdownMenuItem onClick={handleOnCreateColorPop}>
                        <Droplet className="mr-2 h-4 w-4" />
                        <span>Color Pop</span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </Container>
      )}

      <Container>

        {Array.isArray(resources) && resources.length > 0 && (
          <form>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-12">
              {resources.map((resource) => {
                const isChecked = selected.includes(resource.public_id);
                const imageConfig = getThumbnailPreset(resource, gallery);

                function handleOnSelectResource(checked: boolean) {
                  setSelected((prev) => {
                    if ( checked ) {
                      return Array.from(new Set([...(prev || []), resource.public_id]));
                    } else {
                      return prev.filter((id) => id !== resource.public_id);
                    }
                  });
                }

                return (
                  <li key={resource.public_id} className="bg-white dark:bg-zinc-700">
                    <div
                      className={cn(
                        'group relative border-8 transition-[border]',
                        isChecked ? 'border-blue-500' : 'border-white'
                      )}
                      >
                      <span
                        className={cn(
                          'opacity-0 group-hover:opacity-100 transition-opacity absolute top-0 left-0 p-3 flex justify-between w-full bg-gradient-to-b from-[rgba(0,_0,_0,_.3)]',
                          isChecked && 'opacity-100'
                        )}
                      >
                        <label htmlFor={`${resource.public_id}-select`}>
                          <span className="sr-only">
                            Select Image &quot;{ resource.public_id }&quot;
                          </span>
                          <Checkbox
                            className={cn(
                              'w-6 h-6 rounded-full bg-white shadow',
                              isChecked ? 'border-blue-500' : 'border-zinc-200'
                            )}
                            id={`${resource.public_id}-select`}
                            onCheckedChange={handleOnSelectResource}
                            checked={isChecked}
                          />
                        </label>
                      </span>

                      <Link className="block cursor-pointer" href={`/resources/${resource.asset_id}`}>
                        {resource.tags?.includes(creationTag) && (
                          <span className="group-hover:opacity-0 transition-opacity absolute z-10 top-3 right-3 w-6 h-6 rounded-full">
                            <Sparkles className="text-white w-full h-full" />
                            <span className="sr-only">Creation</span>
                          </span>
                        )}

                        {resource.tags?.includes(favoritesTag) && (
                          <Star className="group-hover:opacity-0 transition-opacity absolute z-10 bottom-3 left-3 w-6 h-6 text-white" />
                        )}

                        <CldImage
                          {...imageConfig}
                          src={resource.public_id}
                          alt={`Image ${resource.public_id}`}
                        />
                      </Link>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div ref={sentinelRef} className="flex justify-center py-8" aria-hidden="true">
              {isFetchingNextPage && (
                <Loader2 className="text-zinc-400 h-8 w-8 animate-spin" />
              )}
            </div>
          </form>
        )}
        {(!Array.isArray(resources) || resources.length === 0) && (
          <div className="w-full text-center pt-12">
            <p className="text-xl mb-4">Your PhotoCrate is empty!</p>
            {process.env.NEXT_PUBLIC_PHOTOCRATE_MODE !== 'read-only' && (
              <p>
                <UploadButton>
                  <span className={`${buttonVariants()} flex items-center`}>
                    <Upload className="mr-2 h-4 w-4" /> Upload a Photo
                  </span>
                </UploadButton>
              </p>
            )}
          </div>
        )}
      </Container>
    </>
  )
}

export default MediaGallery;
