# Photobox

Google Photos clone for building a dynamic image gallery with Cloudinary.

Features include:
* Gallery view of all Photobox-uploaded images
* Image viewer with AI-powered editing
* Filters and Effects
* Creations including Collages, Animations, & Color Pop

## What's Inside

Technology used to build Photobox includes:

* Next.js App Router
* React Server Components for initial resource queries
* Suspense loading states
* Styling with Tailwind CSS
* Components using shadcn/ui
* Request management with Tanstack React Query
* Cloudinary for image storage, optimization, and transformation

## Getting Started

1. Fork or clone Photobox to your local environment.

2. Create a .env.local file or configure your environment variables to include:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloud Name>"
NEXT_PUBLIC_CLOUDINARY_API_KEY="<Your API Key>"
CLOUDINARY_API_SECRET="<Your API Secret>"

NEXT_PUBLIC_CLOUDINARY_ASSETS_FOLDER="photobox"
NEXT_PUBLIC_CLOUDINARY_ASSETS_TAG="photobox"
NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG="photobox-library"
NEXT_PUBLIC_CLOUDINARY_CREATION_TAG="photobox-creation"
NEXT_PUBLIC_CLOUDINARY_FAVORITES_TAG="photobox-favorite"
NEXT_PUBLIC_CLOUDINARY_TRASH_TAG="photobox-trash"
```

3. Install dependencies and start the project.

```
npm install
npm run dev
```

