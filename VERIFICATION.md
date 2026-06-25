# PhotoCrate — Verification Report

Comprehensive checklist proving the application builds, renders, and executes its core Cloudinary functionality. Last verified against the upgraded codebase on **2026-06-17**.

---

## 1. Environment and dependencies

| # | Check | Command / action | Expected result | Status |
|---|-------|------------------|-----------------|--------|
| 1.1 | Node version meets minimum | `node -v` | v20.x or v22.x | ✅ Pass (v22.11.0) |
| 1.2 | Dependencies install cleanly | `npm install` | Exit code 0, no errors | ✅ Pass |
| 1.3 | Environment file present | `cp .env.example .env.local` and fill values | Cloud name, API key, and secret set | ☐ Manual (requires your Cloudinary account) |

---

## 2. Automated quality gates

| # | Check | Command | Expected result | Status |
|---|-------|---------|-----------------|--------|
| 2.1 | Unit & integration tests | `npm test` | 27/27 tests pass | ✅ Pass |
| 2.2 | Upload signing allowlist | `npm test` | `upload-signing.test.ts` rejects unknown params and invalid folders | ✅ Pass |
| 2.3 | Remote upload URL guard | `npm test` | `upload-validation.test.ts` rejects non-Cloudinary URLs | ✅ Pass |
| 2.4 | Pagination API wrapper | `npm test` | `cloudinary.test.ts` returns `nextCursor` and forwards `next_cursor` | ✅ Pass |
| 2.5 | Sign endpoint route | `npm test` | `sign-cloudinary-params/route.test.ts` 3/3 pass | ✅ Pass |
| 2.6 | Upload endpoint route | `npm test` | `upload/route.test.ts` 4/4 pass including read-only and demo guards | ✅ Pass |
| 2.7 | Resources API route | `npm test` | `resources/route.test.ts` 2/2 pass | ✅ Pass |
| 2.8 | Delivery presets | `npm test` | `delivery-presets.test.ts` 4/4 pass | ✅ Pass |
| 2.9 | MediaViewer tab fix | `npm test` | `MediaViewer.test.tsx` renders Enhance panel on Edit | ✅ Pass |
| 2.10 | Production build | `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=test-cloud NEXT_PUBLIC_CLOUDINARY_API_KEY=test-key CLOUDINARY_API_SECRET=test-secret npm run build` | Exit code 0, all routes compiled | ✅ Pass |
| 2.11 | ESLint | `npm run lint` | Exit code 0 (1 non-blocking warning in test mock) | ✅ Pass |

**Automated summary:** 27/27 tests passing · build OK · lint OK

---

## 3. Backend (Next.js API routes + Cloudinary Admin API)

Requires valid Cloudinary credentials in `.env.local`.

| # | Check | Command / action | Expected result | Status |
|---|-------|------------------|-----------------|--------|
| 3.1 | Dev server starts | `npm run dev` | Next.js ready at http://localhost:3000 | ☐ Manual |
| 3.2 | List resources by tag | `curl "http://localhost:3000/api/resources?tag=photocrate-library"` | HTTP 200, JSON `{ data: [...], nextCursor }` | ☐ Manual |
| 3.3 | Cursor pagination | Repeat 3.2 with `&cursor=<nextCursor>` from prior response | Next page of resources returned | ☐ Manual |
| 3.4 | Signed upload params rejected (read-only) | Set `NEXT_PUBLIC_PHOTOCRATE_MODE=read-only`, POST to `/api/sign-cloudinary-params` | HTTP 401 Unauthorized | ☐ Manual |
| 3.5 | Signed upload params accepted | POST valid `paramsToSign` with folder + tags to `/api/sign-cloudinary-params` | HTTP 200, `{ signature }` returned | ☐ Manual |
| 3.6 | Remote upload blocked | POST `/api/upload` with non-Cloudinary file URL | HTTP 401 | ☐ Manual |
| 3.7 | Tag update | Favorite or trash an asset via viewer UI | `POST /api/resources/tags/update` succeeds; tags change in Cloudinary | ☐ Manual |

---

## 4. Frontend (Next.js App Router + next-cloudinary)

| # | Check | Command / action | Expected result | Status |
|---|-------|------------------|-----------------|--------|
| 4.1 | Library page renders | Open http://localhost:3000 | Photos grid or empty-state upload prompt visible | ☐ Manual |
| 4.2 | Infinite scroll | Scroll to bottom of a large library | Loading spinner appears; additional photos load | ☐ Manual |
| 4.3 | Upload Widget | Click Upload, select image | Widget completes; new photo appears in grid | ☐ Manual |
| 4.4 | Viewer opens | Click a thumbnail | Full-screen viewer with Back, Edit, Info, Favorite, Delete controls | ☐ Manual |
| 4.5 | Edit panel tabs | Click Edit (pencil) | Enhance tab content visible (Improve, Restore, Remove Background) | ☐ Manual |
| 4.6 | Sidebar navigation | Visit Photos, Creations, Favorites, Trash | Each view filters by the correct Cloudinary tag | ☐ Manual |
| 4.7 | Responsive delivery | Inspect thumbnail network requests | URLs served from `res.cloudinary.com` with transformation params | ☐ Manual |

---

## 5. Cloudinary functionality (end-to-end)

Requires valid Cloudinary credentials. Background removal and Color Pop require the AI Background Removal add-on.

| # | Feature (API name) | User action | Expected visual / API outcome | Status |
|---|-------------------|-------------|-------------------------------|--------|
| 5.1 | `api_sign_request` + Upload Widget | Upload via nav Upload button | Asset appears in configured folder with `photocrate` and `photocrate-library` tags | ☐ Manual |
| 5.2 | `resources_by_tag` | Open Photos library | Only assets tagged `photocrate-library` shown | ☐ Manual |
| 5.3 | `c_fill` + `f_auto` + `q_auto` | View gallery thumbnails | Square (or original aspect) optimized images load with lazy loading | ☐ Manual |
| 5.4 | `e_improve` | Edit → Enhance → Improve → Save | Image quality visibly enhanced after save | ☐ Manual |
| 5.5 | `e_gen_restore` | Edit → Enhance → Restore → Save | Noise reduction applied | ☐ Manual |
| 5.6 | `e_background_removal` | Edit → Enhance → Remove Background → Save | Subject isolated on transparent/PNG background | ☐ Manual |
| 5.7 | `e_sepia` / `e_grayscale` / `e_art` | Edit → Filters → select preset → Save | Filter applied to delivered image | ☐ Manual |
| 5.8 | `l_<public_id>` + `e_colorize` | Select 2–4 photos → Collage → Save to Library | Composite collage saved as new tagged asset | ☐ Manual |
| 5.9 | `e_zoompan` + `f_gif` | Select 1 photo → Animation → Save to Library | Animated GIF creation saved | ☐ Manual |
| 5.10 | `e_background_removal` + overlay + `e_grayscale` | Select 1 photo → Color Pop → Save | Color subject on desaturated background | ☐ Manual |
| 5.11 | `update` (tags) | Favorite or move to Trash | Asset moves to Favorites or Trash view via tag change | ☐ Manual |
| 5.12 | `uploader.upload` + `invalidate` | Edit → Save (overwrite) | Same `public_id` updated; CDN cache invalidated | ☐ Manual |

---

## 6. Error handling and security

| # | Check | Action | Expected result | Status |
|---|-------|--------|-----------------|--------|
| 6.1 | Read-only mode | Set `NEXT_PUBLIC_PHOTOCRATE_MODE=read-only` | Upload, Save, Favorite, and Delete controls disabled with tooltips | ☐ Manual |
| 6.2 | Demo mode gate | Read-only without `NEXT_PUBLIC_PHOTOCRATE_DEMO_MODE` | Color Pop intermediate upload rejected | ✅ Pass (unit test) |
| 6.3 | Signing allowlist | Send disallowed param in sign request | HTTP 400 with descriptive error | ✅ Pass (unit test) |
| 6.4 | SSRF guard on upload | POST external URL to `/api/upload` | HTTP 401 — only Cloudinary URLs accepted | ✅ Pass (unit test) |

---

## 7. Production build

| # | Check | Command | Expected result | Status |
|---|-------|---------|-----------------|--------|
| 7.1 | Static pages emitted | `npm run build` | `/`, `/creations`, `/favorites`, `/trash` prerendered | ✅ Pass |
| 7.2 | API routes compiled | `npm run build` | All `/api/*` routes listed as dynamic | ✅ Pass |
| 7.3 | Production server | `npm run build && npm start` | App serves on port 3000 from production bundle | ☐ Manual |

---

## Quick verification script

Run automated checks in one command:

```bash
npm install && npm test && NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=test-cloud NEXT_PUBLIC_CLOUDINARY_API_KEY=test-key CLOUDINARY_API_SECRET=test-secret npm run build && npm run lint
```

Expected: 27 tests pass, build succeeds, lint exits 0.

---

## Sign-off template

| Role | Name | Date | Automated gates | Manual E2E |
|------|------|------|-----------------|------------|
| Developer | | | ☐ | ☐ |
| Reviewer | | | ☐ | ☐ |

**Manual E2E** items (sections 3, 4, 5, 7.3) require Cloudinary credentials and a running local or deployed environment.
