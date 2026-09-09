"use client";

import { useInfiniteQuery, useQueryClient, useMutation } from '@tanstack/react-query';

import { CloudinaryResource } from '@/types/cloudinary';

interface ResourcesPage {
  data: Array<CloudinaryResource>;
  nextCursor: string | null;
}

interface UseResources {
  disableFetch?: boolean;
  initialResources?: Array<CloudinaryResource>;
  tag?: string;
}

export function useResources(options?: UseResources) {
  const { initialResources, tag, disableFetch } = options || {};
  const queryClient = useQueryClient();
  const queryKey = ['resources', tag] as const;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...rest
  } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams();
      if (tag) params.set('tag', tag);
      if (pageParam) params.set('cursor', pageParam);

      const response = await fetch(`/api/resources?${params.toString()}`);
      const json = await response.json();

      return {
        data: json.data as Array<CloudinaryResource>,
        nextCursor: json.nextCursor as string | null,
      };
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialData: initialResources
      ? {
          pages: [{ data: initialResources, nextCursor: null }],
          pageParams: [undefined],
        }
      : undefined,
    enabled: !disableFetch,
  });

  const resources = data?.pages.flatMap((page) => page.data) ?? [];

  const _addResources = useMutation({
    mutationFn: async (newResources: Array<CloudinaryResource>) => newResources,
    onMutate: async (newResources) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<{
        pages: Array<ResourcesPage>;
        pageParams: Array<string | undefined>;
      }>(queryKey);

      queryClient.setQueryData(queryKey, (old: {
        pages: Array<ResourcesPage>;
        pageParams: Array<string | undefined>;
      } | undefined) => {
        if (!old) {
          return {
            pages: [{ data: newResources, nextCursor: null }],
            pageParams: [undefined],
          };
        }

        const [firstPage, ...restPages] = old.pages;

        return {
          ...old,
          pages: [
            {
              data: [...newResources, ...(firstPage?.data ?? [])],
              nextCursor: firstPage?.nextCursor ?? null,
            },
            ...restPages,
          ],
        };
      });

      return { previousData };
    },
    onError: (_err, _newResources, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  function addResources(newResources: Array<CloudinaryResource>) {
    _addResources.mutate(newResources);
  }

  return {
    ...rest,
    resources,
    addResources,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
