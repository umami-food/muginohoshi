import type { APIRoute } from 'astro';
import { LANGS, PAGES, pagePath, t } from '../lib/i18n';

export const GET: APIRoute = ({ site }) => {
  const urls = PAGES.flatMap((page) =>
    LANGS.map((lang) => {
      const loc = new URL(pagePath(lang, page), site).href;
      const alts = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${t(l).lang.html}" href="${new URL(pagePath(l, page), site).href}"/>`).join('\n');
      return `  <url>\n    <loc>${loc}</loc>\n${alts}\n  </url>`;
    })
  ).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
