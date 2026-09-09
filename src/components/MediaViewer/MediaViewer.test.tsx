import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import MediaViewer from '@/components/MediaViewer/MediaViewer';
import { CloudinaryResource } from '@/types/cloudinary';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: vi.fn(),
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock('next-cloudinary', () => ({
  getCldImageUrl: vi.fn(() => 'https://res.cloudinary.com/demo/image/upload/sample.jpg'),
  CldImage: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

const resource: CloudinaryResource = {
  asset_id: 'abc123',
  bytes: 1024,
  created_at: '2024-01-01T00:00:00Z',
  format: 'jpg',
  height: 800,
  public_id: 'photocrate/sample',
  resource_type: 'image',
  secure_url: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
  tags: ['photocrate', 'photocrate-library'],
  width: 1200,
};

function renderMediaViewer() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MediaViewer resource={resource} />
    </QueryClientProvider>
  );
}

describe('MediaViewer', () => {
  it('renders the Enhance tab panel when the edit sheet opens', async () => {
    const user = userEvent.setup();

    renderMediaViewer();

    await user.click(screen.getByRole('button', { name: 'Edit' }));

    expect(screen.getByText('Enhancements')).toBeInTheDocument();
    expect(screen.getByText('Improve')).toBeInTheDocument();
  });
});
