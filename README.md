# Tesla Trek public site

Static marketing + car HUD for the one public demo: [www.tesla-trek.com](https://www.tesla-trek.com).

Canonical app: [tesla-trek-v2](https://github.com/omgawdmadeit1/tesla-trek-v2) (TanStack). If this homepage stays on the HTML HUD, open the TanStack demo at [tesla-trek-v2-tesla-trek.vercel.app](https://tesla-trek-v2-tesla-trek.vercel.app).

Fleet vehicle data is imported from [tesla-fleet-client](https://github.com/omgawdmadeit1/tesla-fleet-client). tesla-trek-v4 `/api/fleet` is not the live product path.

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
| `/` | `index.html` (this demo) |
| `/car` | `car.html` (cleanUrls) |
| `/pay/trek-starter` | `pay/trek-starter.html` |

DOGE Starter unlock is verified server-side via Blockchair (address + amount + in-block). Never from client paste alone.
