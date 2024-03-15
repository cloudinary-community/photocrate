"use client";

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

import { CloudinaryResource } from '@/types/cloudinary';

interface UseResources {
  disableFetch?: boolean;
  initialResources?: Array<CloudinaryResource>;
  tag?: string;
}

export function useResources(options?: UseResources) {
  const { initialResources, tag, disableFetch } = options || {};
  const queryClient = useQueryClient();

  const { data: resources, ...rest }: { data: Array<CloudinaryResource> } = useQuery({
    queryKey: ['resources', tag],
    queryFn: async () => {
      const { data } = await fetch(`/api/resources?tag=${tag}`).then(r => r.json());
      return data;
    },
    initialData: initialResources,
    enabled: !disableFetch
  });

  // Create a new mutation instance that we'll use to update our resources in the query state

  const _addResources = useMutation({
    mutationFn: async (resources: Array<CloudinaryResource>) => {
      console.log(resources)
      return resources
    },
    onMutate: async (newResources) => {
      await queryClient.cancelQueries({ queryKey: ['resources'] })

      const previousResources = queryClient.getQueryData(['resources'])

      queryClient.setQueryData(['resources'], (old: Array<CloudinaryResource>) => [...newResources, ...old])

      return { previousResources }
    },
    onError: (err, newResources, context) => {
      queryClient.setQueryData(['resources'], context?.previousResources)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] })
    },
  })

  // Wrap the mutation function to a simpler API for application calls

  function addResources(resources: Array<CloudinaryResource>) {
    _addResources.mutate(resources);
  }

  return {
    ...rest,
    resources,
    addResources
  };
}