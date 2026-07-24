# Tesla Trek public site

Static marketing + car HUD for [tesla-trek.com](https://www.tesla-trek.com).

## Build

```bash
npm install
npm run build   # purged Tailwind → css/site.css
```

Vercel runs `npm run build` from package.json automatically.

## Vercel Toolbar (production)

Response headers include `x-vercel-skip-toolbar: 1`. Also disable Toolbar for Production in the Vercel project:

**Project → Settings → Toolbar / Comments → Production: Off**

Preview deployments may keep the toolbar.

## Routes

| Path | File |
|------|------|
| `/` | `index.html` |
| `/car` | `car.html` (cleanUrls) |
| `/pay/trek-starter` | `pay/trek-starter.html` |
| API `/api/fleet/*` | tesla-trek-v4 Next app (separate project / same domain) |

DOGE Starter unlock is verified server-side via Blockchair (address + amount + in-block). Never from client paste alone.
