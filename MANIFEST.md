# Asset manifest & setup

## Setup (Vite)
1. `npm create vite@latest sai-world -- --template vanilla`, then `cd sai-world && npm i three 3d-tiles-renderer`
2. Replace the project's `index.html` with this folder's `index.html`, and copy `tiles.js` next to it.
3. Google Cloud: enable **Map Tiles API**, add billing, create an API key, restrict it by HTTP referrer (your domain + localhost). Put it in `window.TILES_KEY` in `index.html`.
4. `npm run dev` to test; `npm run build` and deploy `dist/` (GitHub Pages / Netlify).
Without a key the site runs exactly as before (procedural scenes).

## Sources
| Chapter | Layer | Source / terms | Status |
|---|---|---|---|
| 1 Petra | Photorealistic 3D Tiles | Google Maps Platform Terms + Map Tiles API Policies; Google logo + per-tile data attribution required | coverage **unverified** |
| 2 Machu Picchu | same | same | coverage **unverified** |
| 3 Tokyo Tower | same | same | likely good (dense city), unverified |
| 4 Zhangjiajie | same | same | coverage **unverified** |
| 5 Amazon | 2D procedural fallback | none | no photoreal source chosen |
| 6 Amalfi | same tiles | same | coverage **unverified** |
| 7 Baobabs | same tiles | same | coverage **unverified** |
| 8 Iceland / aurora | 2D procedural fallback | none | aurora has no scan source |
| 9 Vizag | same tiles | same | coverage **unverified** |

## Honest notes
- Landmark coordinates, orbit radii and heights in `tiles.js` are approximate and **untested against real tiles**; expect to tune per chapter. Heights are ellipsoidal, so geoid offset can put the camera too low/high.
- Add the official Google logo from the Map Tiles API Policies page next to `#attr` (required). Do not cache or extract tiles.
- The 3d-tiles-renderer import paths follow its current docs; if your installed version differs, adjust the two imports.
- Not checked yet (candidates only, verify licence per model): Sketchfab CC models, Poly Haven CC0 textures, Copernicus DEM terrain.
- Tiles are not photogrammetry I have verified myself; describe them as Google imagery-based 3D tiles.
