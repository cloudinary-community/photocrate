# 📷 PhotoCrate
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Google Photos clone for building a dynamic image gallery with Cloudinary.

Features include:
* Gallery view of all PhotoCrate-uploaded images
* Image viewer with AI-powered editing
* Filters and Effects
* Creations including Collages, Animations, & Color Pop
* Media Management

## What's Inside

Technology used to build PhotoCrate includes:

* Next.js App Router
* React Server Components for initial resource queries
* Suspense loading states
* Styling with Tailwind CSS
* Components using shadcn/ui
* Request management with Tanstack React Query
* Cloudinary for image storage, optimization, and transformation

## Getting Started

1. Create a new local project

```
npx create-next-app@latest https://github.com/cloudinary-community/photocrate photocrate
```

You can also fork or clone the project manually!

2. Create a .env.local file or configure your environment variables to include:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloud Name>"
NEXT_PUBLIC_CLOUDINARY_API_KEY="<Your API Key>"
CLOUDINARY_API_SECRET="<Your API Secret>"
```

3. Install dependencies and start the project.

```
npm install
npm run dev
```

And you should now be running PhotoCrate at http://localhost:3000/!

## Using PhotoCrate

To start using PhotoCrate, simply upload some images! The Upload button can be found on the top right of the library page.

After uploading, the image should now show up in your gallery where you can either start adding Creations from your image or edit it by navigating to a particular image.

PhotoCrate takes advantage of both folders and tags to organize the images in your Cloudinary account. By default, all images are uploaded to a "photocrate" folder and tagged with "photocrate" and other tags prepended with "photocrate-". This makes it easy to keep track of what images should be included in PhotoCrate without cluttering your existing account. 

## Configuration

PhotoCrate ships with some default configurations to help you get started, but is
customizable based on your needs or preferences.

### Customization

To personalize your PhotoCrate without manually updating the code, a few options
are made available for configuration.

The default values used for these are:

```jsx
const config = {
  title: 'PhotoCrate'
  logo: <Focus className="w-6 h-6" />,
};
```

You can configure these values inside of the `theme.config.tsx` file as needed:

```jsx
const config = {
  title: '<Your Title>'
  logo: <YourLogo />,
}
```

### Asset Organization

Tags and folders are used to organize assets which are displayed in the app and
also used for functional needs like providing Favorites and Trash capabilities.

The default values used for these are:

```jsx
const config = {
  assetsFolder:  'photocrate',
  assetsTag: 'photocrate',
  libraryTag: 'photocrate-library',
  creationTag: 'photocrate-creation',
  favoritesTag: 'photocrate-favorite',
  trashTag: 'photocrate-trash',
};
```

There are two ways that you can configure these values, by using the `theme.config.tsx` file
or by configuring environment variables.

Using `theme.config.tsx`, add the following properties as needed:

```jsx
const config = {
  assetsFolder: '<Your Folder>';
  assetsTag: '<Your Tag>';
  libraryTag: '<Your Tag>';
  creationTag: '<Your Tag>';
  favoritesTag: '<Your Tag>';
  trashTag: '<Your Tag>';
}
```

Using environment variables, configure the following as needed:

```shell
NEXT_PUBLIC_CLOUDINARY_ASSETS_FOLDER="<Your Folder>"
NEXT_PUBLIC_CLOUDINARY_ASSETS_TAG="<Your Tag>"
NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG="<Your Tag>"
NEXT_PUBLIC_CLOUDINARY_CREATION_TAG="<Your Tag>"
NEXT_PUBLIC_CLOUDINARY_FAVORITES_TAG="<Your Tag>"
NEXT_PUBLIC_CLOUDINARY_TRASH_TAG="<Your Tag>"
```

## Contributors ✨

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