# PhotoCrate

PhotoCrate is a Next.js 15 + React 19 Google Photos–style gallery that stores, organizes, transforms, and delivers images with Cloudinary signed uploads, the Upload Widget, Admin API asset management, responsive delivery (`f_auto`, `q_auto`), AI enhancements, overlays, and generative effects.

## Use cases

- **Personal or team photo libraries** — Upload images into a tagged Cloudinary folder, browse them in a responsive grid with infinite scroll, and open a full-screen viewer without building storage or CDN plumbing from scratch.
- **Media management demos** — Showcase favorites, trash (soft-delete via tags), creations (collages, animations, color pop), and in-browser editing workflows that persist back to Cloudinary.
- **Cloudinary integration reference** — Study signed upload parameter validation, cursor-paginated `resources_by_tag` queries, remote URL re-upload of transformed assets, and `next-cloudinary` delivery components in a production-style App Router app.

## Tech stack

- [Next.js 15](https://nextjs.org/) — App Router, React Server Components, API routes
- [React 19](https://react.dev/) — client components for gallery, viewer, and uploads
- [TypeScript](https://www.typescriptlang.org/) — typed frontend and server code
- [TanStack Query](https://tanstack.com/query) — infinite gallery pagination and optimistic updates
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) — layout and UI primitives
- [next-cloudinary](https://next.cloudinary.dev/) — `CldImage`, `CldUploadButton`, `getCldImageUrl`, signed upload widget
- [Cloudinary Node SDK](https://cloudinary.com/documentation/node_integration) — Admin API, signed params, server-side upload

## Cloudinary features used

- `api_sign_request` — server-side signing of Upload Widget parameters (folder, tags, resource type) so uploads cannot be redirected to unauthorized destinations
- `uploader.upload` — saves edited images, creations, and remote transformation URLs back to your Cloudinary account
- `resources_by_tag` — lists gallery assets by tag with cursor pagination (`next_cursor`, `max_results`)
- `resources_by_asset_ids` — loads a single asset for the full-screen viewer
- `update` — updates asset tags for favorites, trash, and restore workflows
- `delete_resources` — permanently removes assets (API route available)
- `folder` — organizes uploads under a configurable folder (default `photocrate`)
- `tags` — separates library, creations, favorites, and trash views without duplicating files
- `c_fill` — square gallery thumbnails and collage tile crops
- `g_auto` — automatic subject detection gravity for collage overlays
- `l_<public_id>` — image overlays for multi-photo collages and Color Pop compositing
- `e_improve` — automatic image enhancement in the editor
- `e_gen_restore` — generative restore to reduce noise and imperfections
- `e_background_removal` — AI background removal (requires Cloudinary AI Background Removal add-on)
- `e_grayscale` — grayscale filter preset
- `e_sepia` — sepia filter preset
- `e_art` — artistic filters (`eucalyptus`, `frost`)
- `e_colorize` — white canvas background for collage templates
- `e_zoompan` — animated GIF zoom effect for single-image animations
- `f_auto` — automatically serves WebP or AVIF based on the visitor's browser
- `q_auto` — automatic quality optimization for delivery URLs
- `f_png` — PNG delivery when saving background-removed edits
- `f_gif` — GIF output for animation creations
- `invalidate` — busts CDN cache when overwriting an existing `public_id`

## Prerequisites

Before you begin, ensure you have the following:

- **Node.js 20 or newer** (22 LTS recommended)
- **npm 10 or newer**
- A **Cloudinary account** with API credentials
- **Optional:** Cloudinary [AI Background Removal add-on](https://cloudinary.com/documentation/remove_background) for the Remove Background editor tool and Color Pop creation

## Environment variables

Create a `.env.local` file at the project root. Start from the template:

```bash
cp .env.example .env.local
```

Then set these variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Yes | Cloud name used by the browser Upload Widget and `next-cloudinary` delivery URLs |
| `NEXT_PUBLIC_CLOUDINARY_API_KEY` | Yes | API key included in signed upload parameters |
| `CLOUDINARY_API_SECRET` | Yes | API secret for signing uploads and Admin API calls — **server-only**, never expose to the browser |
| `NEXT_PUBLIC_PHOTOCRATE_MODE` | No | Set to `read-only` to disable uploads, edits, deletes, and favorites |
| `NEXT_PUBLIC_PHOTOCRATE_DEMO_MODE` | No | Set to `true` to allow Color Pop preview uploads when `read-only` is enabled (demo deployments only) |
| `NEXT_PUBLIC_CLOUDINARY_ASSETS_FOLDER` | No | Upload folder (default: `photocrate`) |
| `NEXT_PUBLIC_CLOUDINARY_ASSETS_TAG` | No | Base tag applied to all assets (default: `photocrate`) |
| `NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG` | No | Tag for the main Photos library (default: `photocrate-library`) |
| `NEXT_PUBLIC_CLOUDINARY_CREATION_TAG` | No | Tag for saved creations (default: `photocrate-creation`) |
| `NEXT_PUBLIC_CLOUDINARY_FAVORITES_TAG` | No | Tag for favorites (default: `photocrate-favorite`) |
| `NEXT_PUBLIC_CLOUDINARY_TRASH_TAG` | No | Tag for trash (default: `photocrate-trash`) |

Example `.env.local` contents:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Notes:**

- Variables prefixed with `NEXT_PUBLIC_` are embedded in the client bundle. Only the API **key** is public; the **secret** must stay in server-only variables without the `NEXT_PUBLIC_` prefix.
- For CI and local builds without real credentials, set placeholder values — the production build requires a cloud name but falls back for Open Graph images when unset.

## Running the app

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env.local` and fill in all required Cloudinary values listed above.

### 3. Start the development server

```bash
npm run dev
```

### 4. Open the app

In your browser, go to **http://localhost:3000**.

### 5. Try the core flow

1. Click **Upload** in the top navigation and select one or more images using the Cloudinary Upload Widget.
2. Confirm new photos appear in the **Photos** library grid (scroll down to load more if you have many assets).
3. Click a thumbnail to open the full-screen **viewer**.
4. Click **Edit** (pencil icon) to open the enhancement, crop, and filter panel — try Improve, Sepia, or Remove Background.
5. Click **Save** to overwrite the asset with the transformed version, or use **Save as Copy** to create a new file.
6. Select multiple photos in the grid, open the **Create New** menu, and save a **Collage**, **Animation**, or **Color Pop** creation.

### Alternative: bootstrap from the template repository

```bash
npx create-next-app@latest -e https://github.com/cloudinary-community/photocrate photocrate
cd photocrate
cp .env.example .env.local
# Edit .env.local with your Cloudinary credentials
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server on port 3000 |
| `npm run build` | Create an optimized production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint (Next.js config) |
| `npm test` | Run Vitest unit and integration tests once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## Configuration

PhotoCrate can be customized without changing application code.

### Branding (`theme.config.tsx`)

```tsx
import { ThemeConfig } from '@/types/config';

const config: ThemeConfig = {
  title: 'My Gallery',
  // logo: <YourLogo />,
};

export default config;
```

### Asset organization

Override folder and tag names via environment variables (see table above) or extend `theme.config.tsx` with `assetsFolder`, `assetsTag`, `libraryTag`, `creationTag`, `favoritesTag`, and `trashTag`.

### Gallery crop mode

Set `gallery.crop` to `'square'` (default) in `src/lib/config.tsx` or `theme.config.tsx` to deliver uniform square thumbnails via `c_fill`.

### Editor options

Set `editor.backgroundRemoval` to `false` in config to hide Remove Background when the AI add-on is not enabled on your account.

## Production checklist

| Step | Action |
|------|--------|
| Build | Run `npm run build` with production Cloudinary env vars set |
| Host | Deploy to Vercel, Netlify, or any Node.js host that supports Next.js 15 |
| Secrets | Configure `CLOUDINARY_API_SECRET` only in server/host secrets — never in client-exposed variables |
| Smoke test | Upload a photo, verify it appears in the library, open the viewer, apply a filter, and save |
| Read-only demo | Set `NEXT_PUBLIC_PHOTOCRATE_MODE=read-only` for public demos; optionally enable `NEXT_PUBLIC_PHOTOCRATE_DEMO_MODE=true` for Color Pop previews |

## Verification

See [VERIFICATION.md](./VERIFICATION.md) for the full build, test, and Cloudinary functionality checklist.

## Additional documentation

- [GITHUB_METADATA.md](./GITHUB_METADATA.md) — GitHub About description and topic tags for this repository

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://colbyfayock.com/newsletter"><img src="https://avatars.githubusercontent.com/u/1045274?v=4?s=100" width="100px;" alt="Colby Fayock"/><br /><sub><b>Colby Fayock</b></sub></a><br /><a href="https://github.com/cloudinary-community/photocrate/commits?author=colbyfayock" title="Code">💻</a> <a href="https://github.com/cloudinary-community/photocrate/commits?author=colbyfayock" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://nickyt.co"><img src="https://avatars.githubusercontent.com/u/833231?v=4?s=100" width="100px;" alt="Nick Taylor"/><br /><sub><b>Nick Taylor</b></sub></a><br /><a href="https://github.com/cloudinary-community/photocrate/commits?author=nickytonline" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Cloudinary Community

Connect with other developers on [Discord](https://discord.gg/cloudinary) or the [Community Forums](https://community.cloudinary.com/).

Learn more at [cloudinary.com/documentation](https://cloudinary.com/documentation).
