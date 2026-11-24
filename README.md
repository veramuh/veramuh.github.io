# Veras Portfolio

This is my web-portfolio: https://www.vera-mueller.ch/

- `pnpm dev` – local dev server
- `pnpm build` – production build (incl. one HTML file per page, `sitemap.xml`, `robots.txt`)
- Push to `main` deploys automatically via GitHub Actions.
- Page titles, descriptions and Google visibility: `src/router/pages.ts`
- Learning cards (`/cards`) load live from a Google Sheet: `src/cards/sheet.ts`
