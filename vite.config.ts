import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { pages, SITE_URL, SITE_NAME, type PageMeta } from './src/router/pages'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// <head>-Tags für eine Seite (ohne Seite → noindex, z.B. für 404.html)
function headFor(page?: PageMeta): string {
  const title = esc(page?.title ?? SITE_NAME)
  const tags = [`<title>${title}</title>`]
  if (page?.description) {
    const d = esc(page.description)
    tags.push(`<meta name="description" content="${d}" />`, `<meta property="og:description" content="${d}" />`)
  }
  if (page?.index) {
    const url = SITE_URL + page.path
    tags.push(
      `<link rel="canonical" href="${url}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:title" content="${title}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    )
    if (page.image) {
      tags.push(
        `<meta property="og:image" content="${SITE_URL}${page.image}" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
      )
    }
  } else {
    tags.push(`<meta name="robots" content="noindex" />`)
  }
  return tags.join('\n    ')
}

// Beim Build: eigene HTML-Datei pro Seite (z.B. about.html → GitHub Pages liefert /about mit Status 200),
// 404.html für alles andere (z.B. /cards/stadt-zuerich), dazu sitemap.xml und robots.txt.
function seoPages(): Plugin {
  return {
    name: 'seo-pages',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const index = bundle['index.html']
      if (!index || index.type !== 'asset') throw new Error('seo-pages: index.html nicht gefunden')
      const html = String(index.source)
      const withHead = (page?: PageMeta) => html.replace(/<title>[\s\S]*?<\/title>/, headFor(page))

      index.source = withHead(pages[0]) // Startseite "/" = Projects
      for (const page of pages) {
        if (page.path.includes(':')) continue
        this.emitFile({ type: 'asset', fileName: page.path.slice(1) + '.html', source: withHead(page) })
      }
      this.emitFile({ type: 'asset', fileName: '404.html', source: withHead() })

      const urls = pages
        .filter((p) => p.index)
        .map((p) => `  <url><loc>${SITE_URL}${p.path}</loc></url>`)
        .join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), seoPages()],
  base: '/',
})
