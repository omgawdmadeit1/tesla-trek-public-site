// Vercel Routing Middleware (shared by www/emerald/protocol hosts):
// 1) Accept: text/markdown on / and /try-trek returns the .md twin (HTML stays the default).
// 2) robots.txt, sitemap.xml, llms.txt and the ARD file are rewritten to the requesting host's origin.
export const config = { matcher: ['/', '/try-trek', '/robots.txt', '/sitemap.xml', '/llms.txt', '/.well-known/ai-catalog.json'] };

export const MD_TWIN = { '/': '/index.md', '/try-trek': '/try-trek.md' };
const CANON = 'https://www.tesla-trek.com';
const HOST_FILES = {
  '/robots.txt': 'text/plain; charset=utf-8',
  '/sitemap.xml': 'application/xml; charset=utf-8',
  '/llms.txt': 'text/plain; charset=utf-8',
  '/.well-known/ai-catalog.json': 'application/json; charset=utf-8',
};

export function wantsMarkdown(accept) {
  return String(accept || '').split(',').some((part) => {
    const [type, ...params] = part.trim().toLowerCase().split(';').map((s) => s.trim());
    if (type !== 'text/markdown') return false;
    const q = params.find((p) => p.startsWith('q='));
    return !q || parseFloat(q.slice(2)) > 0;
  });
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const type = HOST_FILES[url.pathname];
  if (type) {
    if (url.origin === CANON || request.headers.get('x-trek-raw')) return; // serve the static file
    const res = await fetch(new URL(url.pathname, url.origin), { headers: { 'x-trek-raw': '1' } });
    if (!res.ok) return;
    const body = (await res.text()).split(CANON).join(url.origin).split('tesla-trek.com:skills').join(url.host + ':skills');
    const h = { 'content-type': type, 'cache-control': 'public, max-age=300' };
    if (url.pathname.startsWith('/.well-known/')) h['access-control-allow-origin'] = '*';
    return new Response(body, { status: 200, headers: h });
  }
  if (!wantsMarkdown(request.headers.get('accept'))) return;
  const src = MD_TWIN[url.pathname];
  if (!src) return;
  const res = await fetch(new URL(src, url.origin), { headers: { accept: 'text/markdown' } });
  if (!res.ok) return;
  const body = await res.text();
  return new Response(body, {
    status: 200,
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'vary': 'Accept',
      'x-markdown-tokens': String(Math.ceil(body.length / 4)),
      'link': `<${url.origin}${url.pathname}>; rel="canonical"; type="text/html"`,
    },
  });
}
